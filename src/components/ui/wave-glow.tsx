"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface WaveGlowProps {
  width?: number
  height?: number
  pointSize?: number
  waveSpeed?: number
  waveIntensity?: number
  gridDistance?: number
  glowIntensity?: number
  colorA?: string
  colorB?: string
  colorC?: string
  className?: string
}

export function WaveGlow({
  width,
  height,
  pointSize = 4.0,
  waveSpeed = 2.0,
  waveIntensity = 8.0,
  gridDistance = 3,
  glowIntensity = 1.2,
  colorA = "#FFC49B",
  colorB = "#294C60",
  colorC = "#ADB6C4",
  className = "",
}: WaveGlowProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const container = canvasRef.current
    const w = width || window.innerWidth
    const h = height || window.innerHeight
    const dpr = window.devicePixelRatio

    const fov = 60
    const fovRad = (fov / 2) * (Math.PI / 180)
    const dist = h / 2 / Math.tan(fovRad)

    const timer = new THREE.Timer()

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(dpr)
    rendererRef.current = renderer

    container.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(fov, w / h, 1, dist * 2)
    camera.position.set(0, 0, 10)

    const scene = new THREE.Scene()

    const geo = new THREE.BufferGeometry()
    const positions: number[] = []

    const gridWidth = 400 * (w / h)
    const depth = 400

    for (let x = 0; x < gridWidth; x += gridDistance) {
      for (let z = 0; z < depth; z += gridDistance) {
        positions.push(-gridWidth / 2 + x, -30, -depth / 2 + z)
      }
    }

    const positionAttribute = new THREE.Float32BufferAttribute(positions, 3)
    geo.setAttribute("position", positionAttribute)

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_point_size: { value: pointSize },
        u_glow_intensity: { value: glowIntensity },
        u_color_a: { value: new THREE.Color(colorA) },
        u_color_b: { value: new THREE.Color(colorB) },
        u_color_c: { value: new THREE.Color(colorC) },
      },
      vertexShader: `
        #define M_PI 3.1415926535897932384626433832795
        precision highp float;

        uniform float u_time;
        uniform float u_point_size;

        varying float v_wave_height;
        varying float v_dist_from_center;
        varying float v_phase;

        void main() {
          vec3 p = position;

          // Wave displacement — same cos+sin physics from the wave animation
          float wave = (
            cos(p.x / M_PI * ${waveIntensity.toFixed(1)} + u_time * ${waveSpeed.toFixed(1)}) +
            sin(p.z / M_PI * ${waveIntensity.toFixed(1)} + u_time * ${waveSpeed.toFixed(1)})
          );
          p.y += wave;

          // Pass wave height normalized to [-1, 1] for color blending
          v_wave_height = wave * 0.5;

          // Distance from grid center for radial glow falloff
          float dx = position.x;
          float dz = position.z;
          v_dist_from_center = length(vec2(dx, dz)) / 200.0;

          // Phase offset for chromatic shifting (inspired by shader animation bands)
          v_phase = fract(
            length(vec2(p.x, p.z)) * 0.008 - u_time * 0.15
          );

          gl_PointSize = u_point_size * (1.0 + 0.5 * wave);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float u_time;
        uniform float u_glow_intensity;
        uniform vec3 u_color_a;
        uniform vec3 u_color_b;
        uniform vec3 u_color_c;

        varying float v_wave_height;
        varying float v_dist_from_center;
        varying float v_phase;

        void main() {
          // Soft circular glow per particle using point UV
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);

          // Discard pixels outside the circle for clean glow
          if (dist > 0.5) discard;

          // Smooth radial glow falloff
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow = pow(glow, 1.5) * u_glow_intensity;

          // Blend three neon colors based on wave height + chromatic phase
          // This produces the color-shifting band effect from the shader animation
          float t = v_wave_height * 0.5 + 0.5; // remap to [0, 1]

          // Chromatic band offsets (from shader animation's j-loop concept)
          float band_r = smoothstep(0.0, 0.6, t + sin(v_phase * 6.2831 + 0.0) * 0.3);
          float band_g = smoothstep(0.0, 0.6, t + sin(v_phase * 6.2831 + 2.094) * 0.3);
          float band_b = smoothstep(0.0, 0.6, t + sin(v_phase * 6.2831 + 4.189) * 0.3);

          vec3 color = band_r * u_color_a + band_g * u_color_b + band_b * u_color_c;

          // Intensity falloff from center of the grid for vignette-like depth
          float radialFade = 1.0 - smoothstep(0.3, 1.5, v_dist_from_center);
          color *= radialFade;

          // Final output with glow alpha
          float alpha = glow * radialFade;
          gl_FragColor = vec4(color * glow, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const mesh = new THREE.Points(geo, mat)
    scene.add(mesh)

    function render() {
      timer.update()
      const time = timer.getElapsed()
      mat.uniforms.u_time.value = time
      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!width && !height) {
        const newW = window.innerWidth
        const newH = window.innerHeight
        camera.aspect = newW / newH
        camera.updateProjectionMatrix()
        renderer.setSize(newW, newH)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      geo.dispose()
      mat.dispose()
    }
  }, [width, height, pointSize, waveSpeed, waveIntensity, gridDistance, glowIntensity, colorA, colorB, colorC])

  return (
    <div
      ref={canvasRef}
      className={className}
      style={{
        width: width || "100vw",
        height: height || "100vh",
        overflow: "hidden",
      }}
    />
  )
}
