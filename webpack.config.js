const path = require("path");

module.exports = {
  entry: "./index.js",
  target: "node",
  output: {
    filename: "json-prompt-schema.min.js",
    path: path.resolve(__dirname, "dist"),
  },
};
