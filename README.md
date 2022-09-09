<!-- @format -->

# prompt json schema

[Contributing](https://github.com/ilyashusterman/prompt-json-schema/blob/master/README.md)

[![N|prompt-json-schema](https://github.com/ilyashusterman/prompt-json-schema/blob/master/docs/logo.png)](https://www.npmjs.com/package/prompt-json-schema)

//TODO fix shell usage

```shell
$ npm run build
$ chmod 777 ./dist/prompt-json-schema.js
$ ./dist/prompt-json-schema.js
```

## Installation

Using npm:

```shell
$ npm i prompt-json-schema
```

Note: add `--save` if you are using npm < 5.0.0

In Node.js:

```js
// Load the full build.
const promptSchema = require("prompt-json-schema");
// initialize schema
const schema = {
  title: "Product",
  description: "A product from Acme's catalog",
  type: "object",
  properties: {
    productId: {
      description: "The unique identifier for a product",
      type: "integer",
    },
    productName: {
      description: "Name of the product",
      type: "string",
    },
    price: {
      description: "The price of the product",
      type: "number",
      exclusiveMinimum: 0,
    },
    tags: {
      description: "Tags for the product",
      type: "array",
      items: {
        type: "number",
      },
      minItems: 1,
      uniqueItems: true,
    },
    warehouseLocation: {
      description: "Coordinates of the warehouse where the product is located.",
      $ref: "https://example.com/geographical-location.schema.json",
    },
  },
  required: ["productId"],
};
// async function establishment by the user call input
const result = await promptSchema(schema);
console.log("here result>>\n", result);
```

## Why prompt-json-schema?

prompt-json-schema makes prompt in terminal or JavaScript shell (repl) easier by taking the hassle out of working json-schema objects,<br>
numbers, objects, strings, etc. prompt-json-schema modular methods are great for:

- CLI
- Manipulating & testing validations on json schema's data structures
- Creating composite data objects

## demo

[![N|demo-terminal](https://github.com/ilyashusterman/prompt-json-schema/blob/master/docs/terminal_demo.png)]
