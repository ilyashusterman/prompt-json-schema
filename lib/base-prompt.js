const promptSync = require('prompt-sync')();
const { yellowBright } = require('chalk');
const { CONFIRM_OPTIONS, POSITIVE_CONFIRM } = require('./config');

const EXIT_VALUES = [undefined, null, '.exit'];
const POSITIVE_EXIT_CONFIRM = POSITIVE_CONFIRM.concat(EXIT_VALUES);
const CONFIRM_EXIT_OPTIONS = CONFIRM_OPTIONS.concat(EXIT_VALUES);
const isConfirmExit = () => {
  let answer = null;
  do {
    answer = promptSync(`${yellowBright('(To exit, select y/n or press Ctrl+C again or type .exit)')} y/n?`);
  } while (!CONFIRM_EXIT_OPTIONS.includes(answer));

  if (POSITIVE_EXIT_CONFIRM.includes(answer)) {
    return true;
  }
  return false;
};

const promptValue = (message) => {
  const value = promptSync(message);
  if (value === null || value === undefined) {
    if (isConfirmExit()) {
      throw new Error('Exit Prompt');
    }
  }
  return value;
};

module.exports = {
  promptValue,
};
