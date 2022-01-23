const Ajv = require("ajv");
const { red } = require("chalk");

const logError = (message) => {
  console.log(red(message));
};
const isJsonPropNotValid = (opts, value) => {
  const ajv = new Ajv();
  const valid = ajv.validate(opts, value);
  const isNotValid = !valid;
  if (isNotValid) {
    logError(
      `${opts.description} : ${ajv.errors[0].message} >>>Got '${value}'`
    );
  }
  return isNotValid;
};

module.exports = {
  isJsonPropNotValid,
  logError,
};
