const { red } = require('chalk');

const logError = (message) => {
  console.log(red(message));
};
const isJsonPropNotValid = (schema, value, ajv) => {
  const valid = ajv.validate(schema, value);
  const isNotValid = !valid;
  if (isNotValid) {
    logError(`${schema.description} : ${ajv.errors[0].message} >>>Got '${value}'`);
  }
  return isNotValid;
};

const validateSchema = (schema, valueObj, ajv) => {
  const valid = ajv.validate(schema, valueObj);
  const isNotValid = !valid;
  if (isNotValid) {
    logError(`${schema.description} : ${ajv.errors[0].message} >>>Got '${JSON.stringify(valueObj)}'`);
    throw ajv.errors;
  }
};
module.exports = {
  isJsonPropNotValid,
  logError,
  validateSchema,
};
