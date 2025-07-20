module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.{ts,tsx}': ['eslint --cache --fix'],
  '**/*.{js,jsx}': ['eslint --cache --fix'],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': filenames => `prettier --write ${filenames.join(' ')}`,
};
