const { cyan, greenBright } = require('chalk');
const { promptValue } = require('./base-prompt');
const { CONFIRM_OPTIONS, POSITIVE_CONFIRM } = require('./config');

const boolQuestion = (title) => {
  let answer = null;
  do {
    answer = promptValue(`${title} y/n?`);
  } while (!CONFIRM_OPTIONS.includes(answer));

  if (POSITIVE_CONFIRM.includes(answer)) {
    return true;
  }
  return false;
};

const isConfirmRequired = (required, key) => {
  if (required.includes(key)) {
    return true;
  }
  return boolQuestion(`${cyan('Add')} ${greenBright(key)}`);
};

module.exports = {
  isConfirmRequired,
  boolQuestion,
};
