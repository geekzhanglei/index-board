import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "src");
const dist = resolve(root, "dist");
const vendor = resolve(root, "node_modules/echarts/dist/echarts.esm.min.js");
const assetVersion = (process.env.GITHUB_SHA || "local").slice(0, 12);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(src, dist, { recursive: true });
await mkdir(resolve(dist, "vendor"), { recursive: true });
await cp(vendor, resolve(dist, "vendor/echarts.esm.min.js"));
const indexFile = resolve(dist, "index.html");
const indexHtml = await readFile(indexFile, "utf8");
await writeFile(indexFile, indexHtml.replaceAll("__ASSET_VERSION__", assetVersion));
await writeFile(resolve(dist, ".nojekyll"), "");

console.log(`Built ${dist}`);
