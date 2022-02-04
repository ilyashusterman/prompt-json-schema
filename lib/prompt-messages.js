const { greenBright, cyanBright } = require('chalk');

const printPromptTitle = (schemaProps) => {
  if (schemaProps.hasOwnProperty('properties')) {
    console.log(cyanBright(`Add ${schemaProps.title}: ${schemaProps.description}`));
  }
};

const IMPLEMENTED_PREFIX_KEYS = {
  password: (value, key) => 'Password-hidden',
};
const getDisplayParam = (valueObj, key) => {
  if (key in IMPLEMENTED_PREFIX_KEYS) {
    return IMPLEMENTED_PREFIX_KEYS[key](valueObj, key);
  }
  return valueObj;
};
const displayDefaultParam = (valueObj, key) => {
  if (valueObj === undefined) {
    return '';
  }
  const defaultVal = getDisplayParam(valueObj, key);
  return ` defaults(${defaultVal})`;
};
const getPromptValueQuestion = (valueObj, schema, key) => {
  const defaultObjMessage = displayDefaultParam(valueObj, key);
  const promptValueTitle = `${cyanBright(schema.description || key)} ${greenBright(defaultObjMessage)}:`;
  return promptValueTitle;
};
module.exports = {
  printPromptTitle,
  getPromptValueQuestion,
};
