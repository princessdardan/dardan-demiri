"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { sampleTextPositions } from "@/lib/particle-text-sampler";
import type { Skills } from "@/types";

export interface ParticleDisplayProps {
  activeCategory: string | null;
  skills: Skills;
  className?: string;
}

const PARTICLE_COUNT = 2500;
const TRANSITION_SPEED = 2.5; // units per second — ~400ms full transition
const WAVE_SPEED = 1.8;
const WAVE_INTENSITY = 0.04;

type TransitionState = "idle" | "forming" | "showing" | "dissolving";

const vertexShader = `
  precision highp float;

  attribute vec3 targetPosition;

  uniform float u_time;
  uniform float u_transition;
  uniform float u_point_size;
  uniform vec2 u_resolution;

  varying float v_wave_height;
  varying float v_dist_from_center;
  varying float v_phase;

  #define M_PI 3.1415926535897932384626433832795

  void main() {
    // Wave position: apply wave displacement to grid Y
    vec3 wavePos = position;
    float wave = (
      sin(wavePos.x * ${WAVE_INTENSITY} + u_time * ${WAVE_SPEED}) +
      cos(wavePos.y * ${WAVE_INTENSITY * 0.8} + u_time * ${WAVE_SPEED * 0.7})
    ) * 15.0;
    wavePos.y += wave;

    // Blend between wave position and text target on GPU
    vec3 p = mix(wavePos, targetPosition, u_transition);

    v_wave_height = wave * 0.03;

    // Distance from center for radial fade
    float maxDim = max(u_resolution.x, u_resolution.y) * 0.5;
    v_dist_from_center = length(p.xy) / maxDim;

    // Chromatic phase
    v_phase = fract(length(p.xy) * 0.003 - u_time * 0.12);

    // Point size: slightly smaller when forming text for crispness
    float textSizeFactor = mix(1.0, 0.85, u_transition);
    float waveSizeMod = 1.0 + 0.3 * wave * 0.03 * (1.0 - u_transition);
    gl_PointSize = u_point_size * textSizeFactor * waveSizeMod;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform float u_glow_intensity;
  uniform float u_transition;
  uniform vec3 u_color_a;
  uniform vec3 u_color_b;
  uniform vec3 u_color_c;

  varying float v_wave_height;
  varying float v_dist_from_center;
  varying float v_phase;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 1.0) * u_glow_intensity;

    float t = v_wave_height * 0.5 + 0.5;

    float band_r = 0.3 + 0.7 * smoothstep(0.0, 0.6, t + sin(v_phase * 6.2831 + 0.0) * 0.3);
    float band_g = 0.3 + 0.7 * smoothstep(0.0, 0.6, t + sin(v_phase * 6.2831 + 2.094) * 0.3);
    float band_b = 0.3 + 0.7 * smoothstep(0.0, 0.6, t + sin(v_phase * 6.2831 + 4.189) * 0.3);

    vec3 color = band_r * u_color_a + band_g * u_color_b + band_b * u_color_c;

    // Tighter radial fade when showing text, wider when in wave mode
    float fadeEdge = mix(2.0, 3.5, u_transition);
    float radialFade = 1.0 - smoothstep(0.6, fadeEdge, v_dist_from_center);
    float alpha = glow * radialFade;
    gl_FragColor = vec4(color * glow, alpha);
  }
`;

export function ParticleDisplay({
  activeCategory,
  skills,
  className,
}: ParticleDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  // Transition state stored in refs to avoid re-renders
  const transitionRef = useRef(0);
  const stateRef = useRef<TransitionState>("idle");
  const currentCategoryRef = useRef<string | null>(null);
  const nextCategoryRef = useRef<string | null>(null);
  const textCacheRef = useRef<Map<string, Float32Array>>(new Map());
  const targetAttrRef = useRef<THREE.Float32BufferAttribute | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const precomputeCategory = useCallback(
    async (categoryName: string) => {
      if (textCacheRef.current.has(categoryName)) return;
      const { width, height } = dimensionsRef.current;
      if (width === 0 || height === 0) return;

      const categorySkills = skills[categoryName as keyof Skills];
      if (!categorySkills) return;

      const positions = await sampleTextPositions(
        categorySkills,
        width,
        height,
        PARTICLE_COUNT
      );
      textCacheRef.current.set(categoryName, positions);
    },
    [skills]
  );

  // Handle category changes
  useEffect(() => {
    const state = stateRef.current;
    const currentCat = currentCategoryRef.current;

    if (activeCategory === null) {
      // Deselect: dissolve back to wave
      if (state === "forming" || state === "showing") {
        stateRef.current = "dissolving";
        nextCategoryRef.current = null;
      }
    } else if (activeCategory !== currentCat) {
      if (state === "idle") {
        // Direct formation
        currentCategoryRef.current = activeCategory;
        const cached = textCacheRef.current.get(activeCategory);
        if (cached && targetAttrRef.current) {
          targetAttrRef.current.array.set(cached);
          targetAttrRef.current.needsUpdate = true;
          stateRef.current = "forming";
        } else {
          // Precompute then form
          precomputeCategory(activeCategory).then(() => {
            const positions = textCacheRef.current.get(activeCategory);
            if (positions && targetAttrRef.current) {
              currentCategoryRef.current = activeCategory;
              targetAttrRef.current.array.set(positions);
              targetAttrRef.current.needsUpdate = true;
              stateRef.current = "forming";
            }
          });
        }
      } else if (state === "forming" || state === "showing") {
        // Dissolve first, queue the new category
        nextCategoryRef.current = activeCategory;
        stateRef.current = "dissolving";
      } else if (state === "dissolving") {
        // Already dissolving, just update the queue
        nextCategoryRef.current = activeCategory;
      }
    }
  }, [activeCategory, precomputeCategory]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const rect = container.getBoundingClientRect();
    let w = Math.floor(rect.width);
    let h = Math.floor(rect.height);
    dimensionsRef.current = { width: w, height: h };

    const dpr = Math.min(window.devicePixelRatio, 2);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(dpr);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // --- Orthographic Camera ---
    const halfW = w / 2;
    const halfH = h / 2;
    const camera = new THREE.OrthographicCamera(
      -halfW,
      halfW,
      halfH,
      -halfH,
      0.1,
      1000
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    // --- Geometry: grid of particles ---
    const cols = 50;
    const rows = Math.round((h / w) * cols);
    const actualCount = PARTICLE_COUNT;
    const positions = new Float32Array(actualCount * 3);
    const targetPositions = new Float32Array(actualCount * 3);

    const spacingX = w / cols;
    const spacingY = h / rows;

    for (let i = 0; i < actualCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      if (row < rows) {
        positions[i * 3] = -halfW + col * spacingX + spacingX / 2;
        positions[i * 3 + 1] = halfH - row * spacingY - spacingY / 2;
      } else {
        // Extra particles scattered
        positions[i * 3] = (Math.random() - 0.5) * w;
        positions[i * 3 + 1] = (Math.random() - 0.5) * h;
      }
      positions[i * 3 + 2] = 0;

      // Default target = same as position (no transition)
      targetPositions[i * 3] = positions[i * 3];
      targetPositions[i * 3 + 1] = positions[i * 3 + 1];
      targetPositions[i * 3 + 2] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const targetAttr = new THREE.Float32BufferAttribute(targetPositions, 3);
    geo.setAttribute("targetPosition", targetAttr);
    targetAttrRef.current = targetAttr;

    // --- Material ---
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_transition: { value: 0.0 },
        u_point_size: { value: 4.5 },
        u_glow_intensity: { value: 1.8 },
        u_resolution: { value: new THREE.Vector2(w, h) },
        u_color_a: { value: new THREE.Color("#FFC49B") },
        u_color_b: { value: new THREE.Color("#294C60") },
        u_color_c: { value: new THREE.Color("#ADB6C4") },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);

    // --- Precompute all categories ---
    const categoryNames = Object.keys(skills) as (keyof Skills)[];
    // Small delay to let the renderer settle, then precompute
    const precomputeTimeout = setTimeout(() => {
      categoryNames.forEach((name) => {
        sampleTextPositions(
          skills[name],
          w,
          h,
          PARTICLE_COUNT
        ).then((pos) => {
          textCacheRef.current.set(name, pos);
        });
      });
    }, 500);

    // --- Animation loop ---
    const timer = new THREE.Timer();
    let lastTime = 0;

    function render() {
      timer.update();
      const elapsed = timer.getElapsed();
      const delta = elapsed - lastTime;
      lastTime = elapsed;

      if (!reducedMotion) {
        mat.uniforms.u_time.value = elapsed;
      }

      // Transition state machine
      const state = stateRef.current;
      let t = transitionRef.current;

      if (state === "forming") {
        t = Math.min(1.0, t + delta * TRANSITION_SPEED);
        if (t >= 1.0) {
          t = 1.0;
          stateRef.current = "showing";
        }
      } else if (state === "dissolving") {
        t = Math.max(0.0, t - delta * TRANSITION_SPEED);
        if (t <= 0.05) {
          t = 0.0;
          const next = nextCategoryRef.current;
          if (next) {
            // Swap to queued category
            const cached = textCacheRef.current.get(next);
            if (cached && targetAttrRef.current) {
              currentCategoryRef.current = next;
              targetAttrRef.current.array.set(cached);
              targetAttrRef.current.needsUpdate = true;
              nextCategoryRef.current = null;
              stateRef.current = "forming";
            } else {
              stateRef.current = "idle";
              currentCategoryRef.current = null;
              nextCategoryRef.current = null;
            }
          } else {
            stateRef.current = "idle";
            currentCategoryRef.current = null;
          }
        }
      }

      transitionRef.current = t;
      mat.uniforms.u_transition.value = t;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(render);
    }

    if (!reducedMotion) {
      render();
    } else {
      // Static render for reduced motion
      renderer.render(scene, camera);
    }

    // --- Resize ---
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const newW = Math.floor(entry.contentRect.width);
      const newH = Math.floor(entry.contentRect.height);
      if (newW === 0 || newH === 0) return;

      w = newW;
      h = newH;
      dimensionsRef.current = { width: w, height: h };

      renderer.setSize(w, h);
      const newHalfW = w / 2;
      const newHalfH = h / 2;
      camera.left = -newHalfW;
      camera.right = newHalfW;
      camera.top = newHalfH;
      camera.bottom = -newHalfH;
      camera.updateProjectionMatrix();
      mat.uniforms.u_resolution.value.set(w, h);

      // Invalidate text cache on resize
      textCacheRef.current.clear();
      categoryNames.forEach((name) => {
        sampleTextPositions(skills[name], w, h, PARTICLE_COUNT).then((pos) => {
          textCacheRef.current.set(name, pos);
        });
      });
    });
    resizeObserver.observe(container);

    return () => {
      clearTimeout(precomputeTimeout);
      resizeObserver.disconnect();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      geo.dispose();
      mat.dispose();
      targetAttrRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-full text-foreground-muted text-sm">
          Skills &amp; Technologies
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
