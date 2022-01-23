const { greenBright, cyanBright } = require('chalk');

const printPromptTitle = (schemaProps) => {
  if (schemaProps.hasOwnProperty('properties')) {
    console.log(cyanBright(`Add ${schemaProps.title}: ${schemaProps.description}`));
  }
};

const isValid = (valueObj) => {
  if (valueObj !== undefined && valueObj !== null) {
    return true;
  }
  return false;
};
const getPromptValueQuestion = (titleSchema, valueObj, opts, key) => {
  const defaultObjMessage = isValid(valueObj) ? ` default (${valueObj})` : '';
  const promptValueTitle = `${cyanBright(opts.description || key)}: ${greenBright(`${titleSchema}.${key}`)}${defaultObjMessage}:`;
  return promptValueTitle;
};
module.exports = {
  printPromptTitle,
  getPromptValueQuestion,
};
