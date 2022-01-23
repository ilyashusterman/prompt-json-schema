const { default: Ajv } = require('ajv');
const { PromptSchemaError } = require('./exceptions');
const { promptProperties } = require('./prompt-json-schema');

const defaultProps = {
  extraSchemaProps: undefined,
  message: undefined,
  objValid: {},
};

class PromptMain {
  static validateSchema(schema) {
    if (schema === undefined) {
      throw new PromptSchemaError('Undefined Schema');
    }
    const ajv = new Ajv();
    const isValid = ajv.validateSchema(schema);
    if (!isValid) {
      throw new PromptSchemaError(ajv.errors);
    }
  }
  constructor(schemaPropsInit, objValid = defaultProps.objValid) {
    PromptMain.validateSchema(schemaPropsInit);
    const { title = 'untitled' } = schemaPropsInit;
    this.schema = schemaPropsInit;
    this.objValid = objValid;
    this.title = title;
  }
  getSchema() {
    if (!this.title) {
      throw new Error('Title not defined in schema');
    }
    return {
      schemaProps: this.schema,
      title: this.title,
    };
  }
}

const promptObject = async (schemaPropsInit, objValid = defaultProps.objValid) => {
  const mainPrompt = new PromptMain(schemaPropsInit, objValid);
  const { schemaProps, title } = mainPrompt.getSchema();
  return await promptProperties(schemaProps, title, objValid);
};

module.exports = {
  promptObject,
};
