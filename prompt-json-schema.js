/** @format */

//required for deploy to cli

const { promptSchema } = require("./lib/prompt");
const repl = require("repl");

repl.start({ prompt: "> " });

module.exports = {
  promptSchema,
};
