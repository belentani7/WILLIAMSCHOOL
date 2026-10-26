import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const publicIdentityFiles = [
  "index.html",
  "metadata.json",
  "server.ts",
  "src/components/AcademicPlan.tsx",
  "src/components/profile/ProfileSelector.tsx",
  "src/data/curriculumData.ts",
  "src/data/miniGames500Data.ts",
  "public/modules/belentani/curriculumData__CULTURAL_GUIDES.json",
  "public/modules/belentani/curriculumData__EDUTUBE_VIDEOS.json",
];

test("public-facing app content does not hardcode an identifiable learner", async () => {
  const contents = await Promise.all(
    publicIdentityFiles.map((path) => readFile(path, "utf8")),
  );

  for (const content of contents) {
    assert.doesNotMatch(
      content,
      /William Danilo|Danilo|14 años, Brasil|14 anos, brasileiro/i,
      "public-facing content must not identify the learner or assume personal details",
    );
  }
});
