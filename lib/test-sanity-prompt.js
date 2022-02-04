const { promptObject } = require('./prompt');

const schema = {
  title: 'Product',
  description: "A product from Acme's catalog",
  type: 'object',
  properties: {
    productId: {
      description: 'The unique identifier for a product',
      type: 'integer',
    },
    productName: {
      description: 'Name of the product',
      type: 'string',
    },
    price: {
      description: 'The price of the product',
      type: 'number',
      exclusiveMinimum: 0,
    },
    tags: {
      description: 'Tags for the product',
      type: 'array',
      items: {
        type: 'number',
      },
      minItems: 1,
      uniqueItems: true,
    },
    dimensions: {
      type: 'object',
      properties: {
        length: {
          type: 'number',
        },
        width: {
          type: 'number',
        },
        height: {
          type: 'number',
        },
      },
      required: ['length', 'width', 'height'],
    },
    warehouseLocation: {
      description: 'Coordinates of the warehouse where the product is located.',
      $ref: 'https://example.com/geographical-location.schema.json',
    },
  },
  required: ['productId', 'productName', 'price'],
};
const test = async () => {
  const result = await promptObject(schema);
  console.log('here result>>', result);
};
test();