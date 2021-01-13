const path = require('path');

module.exports = {
  "stories": [
    "../**/*.stories.@(jsx|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
