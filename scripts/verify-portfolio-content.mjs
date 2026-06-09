import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "src/data/index.ts");
const data = readFileSync(dataPath, "utf8");

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

const expectedTitles = [
  "Drenova Group Real Estate Platform",
  "Aira Publishing Platform",
  "Lash Her Booking and Commerce Platform",
  "Danny’s Fish & Chips Restaurant Platform",
  "PLP — Personalized Learning Plan",
];

const projectsMatch = data.match(/export const projects\s*=\s*\[([\s\S]*?)\];\s*\n\s*export const skills/);
assert(Boolean(projectsMatch), "Could not find export const projects before export const skills");

const projectsBody = projectsMatch?.[1] ?? "";
const actualTitles = [...projectsBody.matchAll(/^\s*title:\s*(["'])(.*?)\1/gm)].map((match) => match[2]);

assert(
  JSON.stringify(actualTitles) === JSON.stringify(expectedTitles),
  `Featured project order mismatch. Expected ${JSON.stringify(expectedTitles)}, got ${JSON.stringify(actualTitles)}`
);

assert(!projectsBody.includes("Aira Medusa"), "Aira Medusa must not appear in Featured Work projects");

for (const title of expectedTitles) {
  const titleIndex = projectsBody.indexOf(`title: "${title}"`);
  assert(titleIndex !== -1, `Missing project title: ${title}`);

  const nextTitleIndexes = expectedTitles
    .filter((otherTitle) => otherTitle !== title)
    .map((otherTitle) => projectsBody.indexOf(`title: "${otherTitle}"`, titleIndex + 1))
    .filter((index) => index !== -1);
  const nextTitleIndex = nextTitleIndexes.length > 0 ? Math.min(...nextTitleIndexes) : projectsBody.length;
  const projectBlock = titleIndex === -1 ? "" : projectsBody.slice(titleIndex, nextTitleIndex);

  for (const requiredField of ["problem", "systemBuilt", "keyTechnicalWork", "businessValue", "stack", "visual", "alt"]) {
    assert(projectBlock.includes(`${requiredField}:`), `${title} is missing ${requiredField}`);
  }
}

for (const liveUrl of [
  "https://drenova.ca",
  "https://airapublishing.com",
  "https://lashher.com",
  "https://dannysfishandchips.com",
]) {
  assert(projectsBody.includes(liveUrl), `Missing live URL: ${liveUrl}`);
}

const plpStart = projectsBody.indexOf('title: "PLP — Personalized Learning Plan"');
const plpBlock = plpStart === -1 ? "" : projectsBody.slice(plpStart);
assert(!plpBlock.includes("live:"), "PLP must not render a public live link");
assert(plpBlock.includes("Scholarly Elite Tutoring"), "PLP must name Scholarly Elite Tutoring as the organization");
assert(plpBlock.toLowerCase().includes("representative"), "PLP visual copy must disclose that the visual is representative");

for (const weakPhrase of [
  "A modern beauty services website",
  "A modern restaurant website",
  "A selection of projects I&apos;m proud of",
  "A selection of projects I'm proud of",
]) {
  assert(!data.includes(weakPhrase), `Weak portfolio wording remains: ${weakPhrase}`);
}

for (const imagePath of [
  "public/images/projects/drenova-group.webp",
  "public/images/projects/aira-publishing.webp",
  "public/images/projects/lash-her.webp",
  "public/images/projects/dannys-fish-and-chips.webp",
  "public/images/projects/plp-personalized-learning-plan.webp",
]) {
  assert(existsSync(path.join(root, imagePath)), `Missing image asset: ${imagePath}`);
}

// Scan root llms.txt if it exists for stale portfolio content
const llmsTxtPath = path.join(root, "llms.txt");
if (existsSync(llmsTxtPath)) {
  const llmsTxt = readFileSync(llmsTxtPath, "utf8");

  // Must contain current project titles in order
  for (const title of expectedTitles) {
    assert(llmsTxt.includes(title), `llms.txt missing current project title: ${title}`);
  }

  // Must NOT contain old project titles
  for (const oldTitle of [
    "Danny's Fish and Chips Website",
    "Aira Publishing E-Commerce Platform",
    "Lash Her Beauty Platform",
    "Modern restaurant website",
    "Modern beauty services website",
  ]) {
    assert(!llmsTxt.includes(oldTitle), `llms.txt contains stale old project title: ${oldTitle}`);
  }

  // Must NOT contain weak old portfolio wording
  for (const weakPhrase of [
    "A modern beauty services website",
    "A modern restaurant website",
    "A selection of projects I&apos;m proud of",
    "A selection of projects I'm proud of",
  ]) {
    assert(!llmsTxt.includes(weakPhrase), `llms.txt contains weak portfolio wording: ${weakPhrase}`);
  }
}

if (errors.length > 0) {
  console.error("Portfolio content verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Portfolio content verification passed.");
