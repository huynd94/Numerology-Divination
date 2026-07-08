import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("./ai-settings.tsx", import.meta.url), "utf8");

assert.match(
  source,
  /return\s*\{\s*\.\.\.defaultSettings,\s*\.\.\.saved,\s*openaiKey:\s*"",\s*geminiKey:\s*""\s*\}/,
  "loadSettings must drop any legacy API keys from localStorage",
);

assert.match(
  source,
  /localStorage\.setItem\(STORAGE_KEY,\s*JSON\.stringify\(persistedSettings\(settings\)\)\)/,
  "localStorage writes must pass through persistedSettings",
);

assert.match(
  source,
  /function\s+persistedSettings[\s\S]*openaiKey:\s*""[\s\S]*geminiKey:\s*""/,
  "persistedSettings must strip provider API keys",
);

console.log("ai-settings storage: ok");
