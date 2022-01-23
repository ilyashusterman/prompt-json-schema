const NUMBERS = ['integer', 'number'];
const valueFactory = (value, options) => {
  const { type } = options;
  if (NUMBERS.includes(type)) {
    try {
      return parseInt(value);
    } catch (error) {
      return value;
    }
  }
  return value;
};

module.exports = {
  valueFactory,
};
