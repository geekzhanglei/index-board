import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";

const root = resolve("src");
const projectRoot = resolve(".");
const port = Number(process.env.PORT || 4173);
const vendorFiles = new Map([
  ["/vendor/echarts.esm.min.js", resolve(projectRoot, "node_modules/echarts/dist/echarts.esm.min.js")]
]);

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function safePath(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  return resolve(root, clean === "/" ? "index.html" : clean.slice(1));
}

createServer(async (req, res) => {
  const urlPath = (req.url || "/").split("?")[0];
  let file = vendorFiles.get(urlPath) || safePath(req.url || "/");
  if (!file.startsWith(root)) {
    const allowedVendor = [...vendorFiles.values()].some(vendorFile => file === vendorFile);
    if (!allowedVendor) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
  }

  try {
    const info = await stat(file);
    if (info.isDirectory()) {
      file = join(file, "index.html");
    }
  } catch {
    file = join(root, "index.html");
  }

  res.setHeader("Content-Type", mime[extname(file)] || "application/octet-stream");
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving http://127.0.0.1:${port}`);
});
