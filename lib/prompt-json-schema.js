const { promptValue } = require('./base-prompt');
const { PRIMITIVE_TYPES } = require('./config');
const { isJsonPropNotValid, logError } = require('./json-schema-validator');
const { valueFactory } = require('./parse');
const { isConfirmRequired, boolQuestion } = require('./prompt-conditions');
const { printPromptTitle, getPromptValueQuestion } = require('./prompt-messages');
const { greenBright, cyanBright } = require('chalk');

const promptValueSchema = (title, schema, valueObj) => {
  const value = promptValue(title);
  return valueFactory(value, schema) || valueFactory(valueObj, schema);
};

const promptPrimitiveValue = (titleSchema, objValid, schema, key, required) => {
  let isPassedRequired = true;
  const valueObj = objValid[key] || undefined;
  const promptValueTitle = getPromptValueQuestion(titleSchema, valueObj, schema, key);
  let valuePrompted;
  do {
    valuePrompted = promptValueSchema(promptValueTitle, schema, valueObj);
    if (required && required.includes(key)) {
      isPassedRequired = valuePrompted !== null;
      if (!isPassedRequired) {
        logError(`"The property ${key}" is required, please fill it!`);
      }
    }
  } while (isJsonPropNotValid(schema, valuePrompted) && isPassedRequired);
  return valuePrompted;
};

const promptProperties = async (schemaProps, titleSchema, objValid = {}) => {
  let res = {};
  const type = schemaProps.type;
  const title = schemaProps.title || titleSchema;
  const required = schemaProps.required || [];
  if (PRIMITIVE_TYPES.includes(type)) {
    return promptPrimitiveValue(titleSchema, objValid, schemaProps, title, required);
  }
  printPromptTitle(schemaProps);
  const propsObj = schemaProps.properties || schemaProps;
  for (const [key, opts] of Object.entries(propsObj)) {
    if (!isConfirmRequired(required, key)) {
      continue;
    }
    if (opts.type === 'object') {
      const valueObject = objValid[key] || {};
      res[key] = await promptProperties(opts, key, valueObject);
    } else if (opts.type === 'array') {
      const valueObject = objValid[key] || [];
      const itemSchema = { title: key, description: opts.description, ...opts.items };
      let updatedArray = await Promise.all(
        valueObject.map(async (item) => {
          return await promptProperties(itemSchema, key, item);
        })
      );
      const message = updatedArray.length > 0 ? 'another ' : '';
      while (boolQuestion(greenBright(`Add ${message}${key} item?`))) {
        const item = await promptProperties(itemSchema, key, {});
        updatedArray.push(item);
      }
      res[key] = updatedArray;
    } else {
      res[key] = promptPrimitiveValue(titleSchema, objValid, opts, key, required);
    }
  }
  return { ...objValid, ...res };
};

module.exports = {
  promptProperties,
};
