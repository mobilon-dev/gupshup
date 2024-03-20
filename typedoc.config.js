const gitRepoUrl = 'https://github.com/antirek/gupshup-api-client';

module.exports = {
  entryPoints: [
    "./src/index.ts",
    // "./src/types/index.ts",
  ],
  out: "docs",
  validation: {
    "notExported": true,
    "invalidLink": true,
    "notDocumented": false
  },
  sourceLinkTemplate: `${gitRepoUrl}/blob/main/{path}#L{line}`,
  includeVersion: true,
  sourceLinkExternal: true,
  navigation: {
    "includeCategories": true,
    "includeGroups": true,
    "includeFolders": true
  },
  "groupOrder": [
    "Classes",
    "Variables",
    "Functions",
    "*",
  ],
};
