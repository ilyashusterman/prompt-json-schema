const { promptProperties } = require('./prompt-json-schema');
const Ajv = require('ajv');
const defaultProps = {
  extraSchemaProps: undefined,
  message: undefined,
  objValid: {},
};

class PromptMain {
  constructor(schemaPropsInit, objValid = defaultProps.objValid) {
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

const promptSchema = async (schemaPropsInit, objValid = defaultProps.objValid) => {
  const mainPrompt = new PromptMain(schemaPropsInit, objValid);
  const { schemaProps, title } = mainPrompt.getSchema();
  return await promptProperties(schemaProps, title, objValid, new Ajv());
};

module.exports = {
  promptSchema,
};
