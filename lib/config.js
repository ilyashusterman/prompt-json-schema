const PRIMITIVE_TYPES = ['integer', 'string', 'number'];
const POSITIVE_CONFIRM = ['y', 'Y'];
const CONFIRM_OPTIONS = ['N', 'n', ...POSITIVE_CONFIRM];
const NULL_VALUES = ['', null, undefined, NaN];

module.exports = {
  POSITIVE_CONFIRM,
  CONFIRM_OPTIONS,
  PRIMITIVE_TYPES,
  NULL_VALUES,
};
