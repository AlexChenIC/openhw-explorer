import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Run after npm ci when changing the lockfile. Served only on request.
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
const required = [
  "next",
  "react",
  "react-dom",
  "next-intl",
  "lucide-react",
  "fuse.js",
  "@vercel/analytics",
  "fast-xml-parser",
];
const covered = new Set();
const blocks = [];
const noticeName = /^(licen[cs]e|copying|notice|copyright)(?:[._-].*)?$/i;

function noticeFiles(directory) {
  const result = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...noticeFiles(path));
    else if (entry.isFile() && noticeName.test(entry.name)) result.push(path);
  }
  return result.sort();
}

for (const [path, entry] of Object.entries(lock.packages).sort(([a], [b]) => a.localeCompare(b))) {
  if (!path || entry.dev || !existsSync(join(path, "package.json"))) continue;
  const pkg = JSON.parse(readFileSync(join(path, "package.json"), "utf8"));
  const files = noticeFiles(path);
  if (!files.length) continue;
  covered.add(pkg.name);
  blocks.push(
    "\n" +
      "=".repeat(78) +
      "\n" +
      pkg.name +
      " " +
      pkg.version +
      "\nDeclared license: " +
      (pkg.license || "See bundled notices") +
      "\nPackage/source archive: https://www.npmjs.com/package/" +
      pkg.name +
      "/v/" +
      pkg.version +
      (entry.resolved?.startsWith("https://registry.npmjs.org/")
        ? "\nArchive: " + entry.resolved
        : "") +
      "\n" +
      files
        .map(
          (file) =>
            "\n--- " + file.slice(path.length + 1) + " ---\n" + readFileSync(file, "utf8").trim(),
        )
        .join("\n"),
  );
}
for (const name of required) {
  if (!covered.has(name)) throw new Error("Missing installed license notices: " + name);
}
for (const [name, source, path] of [
  [
    "Inter font — SIL Open Font License 1.1",
    "https://github.com/rsms/inter/blob/master/LICENSE.txt",
    "docs/licenses/inter-OFL.txt",
  ],
  [
    "Feather portions of Lucide — MIT",
    "https://github.com/feathericons/feather/blob/main/LICENSE",
    "docs/licenses/feather-MIT.txt",
  ],
]) {
  blocks.push(
    "\n" +
      "=".repeat(78) +
      "\n" +
      name +
      "\nSource: " +
      source +
      "\n\n" +
      readFileSync(path, "utf8").trim(),
  );
}

const intro = [
  "OpenHW Explorer — software and font license notices",
  "",
  "OpenHW Explorer software and identified navigator data are Apache-2.0.",
  "Original learning/editorial content and third-party works have separate terms.",
  "See LICENSE-CONTENT.md and docs/third-party-attributions.md in the repository:",
  "https://github.com/AlexChenIC/openhw-explorer",
  "",
  "These notices retain license/copyright texts supplied with the installed,",
  "locked production dependencies, including embedded notices in those packages,",
  "and the Inter font. They also include server/build-time dependencies; inclusion",
  "does not imply that every package is downloaded by a browser. Optional binaries",
  "for other platforms are not inventoried by this installation.",
  "",
  "Package names, versions and source archives accompany their original notices.",
  "Covered software under MPL-2.0: @vercel/analytics is used without source edits.",
  "Its source is available at https://github.com/vercel/analytics and through the",
  "versioned source at https://github.com/vercel/analytics/tree/0028584e514ba508911b9b64bb691616ae63b2e6.",
  "This notice does not relicense any third-party material or grant trademark rights.",
  "",
  "Project software license:",
  "",
].join("\n");
writeFileSync(
  "public/third-party-notices.txt",
  intro + "\n" + readFileSync("LICENSE", "utf8") + blocks.join("\n") + "\n",
);
console.log(
  "Wrote public/third-party-notices.txt: " + covered.size + " packages plus Inter/Feather notices.",
);
