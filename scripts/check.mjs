import { access, readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const requiredFiles = [
  "src/index.html",
  "src/main.js",
  "src/data.js",
  "src/styles.css",
  ".github/workflows/deploy.yml"
];

for (const file of requiredFiles) {
  await access(resolve(file));
}

const html = await readFile("src/index.html", "utf8");
const js = await readFile("src/main.js", "utf8");
const workflow = await readFile(".github/workflows/deploy.yml", "utf8");

if (!html.includes('<div id="app"')) {
  throw new Error("src/index.html must include #app");
}

for (const endpoint of [
  "/blogapi/market/overview",
  "/blogapi/market/fund-flow",
  "/blogapi/market/crowding",
  "/blogapi/market/consensus"
]) {
  if (!js.includes(endpoint)) {
    throw new Error(`main.js does not reference ${endpoint}`);
  }
}

for (const secret of ["SERVER_HOST", "SERVER_USER", "SERVER_SSH_KEY"]) {
  if (!workflow.includes(secret)) {
    throw new Error(`deploy workflow does not reference ${secret}`);
  }
}

const srcFiles = await readdir("src");
if (srcFiles.length < 4) {
  throw new Error("src directory looks incomplete");
}

console.log("Static checks passed");
