const promptSync = require('prompt-sync')();
const { yellowBright } = require('chalk');
const { CONFIRM_OPTIONS, POSITIVE_CONFIRM, NULL_VALUES } = require('./config');
const { valueFactory } = require('./parse');

const EXIT_VALUES = [undefined, null, '.exit'];
const POSITIVE_EXIT_CONFIRM = [...POSITIVE_CONFIRM, ...EXIT_VALUES];
const CONFIRM_EXIT_OPTIONS = [...CONFIRM_OPTIONS, ...EXIT_VALUES];

const isConfirmExit = () => {
  let answer = null;
  do {
    answer = promptSync(`${yellowBright('(To exit, select y/n or press Ctrl+C again or type .exit)')} y/n?`);
  } while (!CONFIRM_EXIT_OPTIONS.includes(answer));

  return POSITIVE_EXIT_CONFIRM.includes(answer);
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

const getPropertyPromptValue = (promptValueTitle, defaultObj, schema) => {
  const value = promptValue(promptValueTitle);
  const valuePrompt = NULL_VALUES.includes(value) ? valueFactory(defaultObj, schema) : valueFactory(value, schema);
  return valuePrompt;
};

module.exports = {
  promptValue,
  getPropertyPromptValue,
};
