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

const promptPrimitiveValue = (objValid, schema, key, ajv) => {
  let isValueRequiredNotNull = true;
  const valueObj = objValid[key] || undefined;
  const promptValueTitle = getPromptValueQuestion(valueObj, schema, key);
  let valuePrompted;
  do {
    valuePrompted = promptValueSchema(promptValueTitle, schema, valueObj);
    let isValueRequiredNotNull = valuePrompted !== null;
    if (!isValueRequiredNotNull) {
      logError(`"The property ${key}" is required, please fill it!`);
    }
  } while (isJsonPropNotValid(schema, valuePrompted, ajv) && isValueRequiredNotNull);
  return valuePrompted;
};

const promptProperties = async (schemaProps, titleSchema, objValid = {}, ajv) => {
  let res = {};
  const type = schemaProps.type;
  const title = schemaProps.title || titleSchema;
  const required = schemaProps.required || [];

  if (PRIMITIVE_TYPES.includes(type)) {
    return promptPrimitiveValue(objValid, schemaProps, title, ajv);
  }

  printPromptTitle(schemaProps);
  const propsObj = schemaProps.properties || schemaProps;
  for (const [key, opts] of Object.entries(propsObj)) {
    if (!isConfirmRequired(required, key)) {
      continue;
    }
    if (opts.type === 'object') {
      const valueObject = objValid[key] || {};
      res[key] = await promptProperties(opts, key, valueObject, ajv);
    } else if (opts.type === 'array') {
      const valueObject = objValid[key] || [];
      const itemSchema = { title: key, description: opts.description, ...opts.items };
      let updatedArray = await Promise.all(
        valueObject.map(async (item) => {
          return await promptProperties(itemSchema, key, item, ajv);
        })
      );
      const message = updatedArray.length > 0 ? 'another ' : '';
      while (boolQuestion(greenBright(`Add ${message}${key} item?`))) {
        const item = await promptProperties(itemSchema, key, {}, ajv);
        updatedArray.push(item);
      }
      res[key] = updatedArray;
    } else {
      res[key] = promptPrimitiveValue(objValid, opts, key, ajv);
    }
  }
  return { ...objValid, ...res };
};

module.exports = {
  promptProperties,
};
