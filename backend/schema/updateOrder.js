const Joi = require("joi");
const { DELIVERY_STATUS } = require("../constants");

const schema = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    "string.length": "ObjectId must be 24 characters long",
    "string.hex": "ObjectId must be a valid hexadecimal",
    "any.required": "Required",
  }),
  status: Joi.string()
    .valid(...DELIVERY_STATUS)
    .required()
    .messages({
      "any.only": "Select a valid category",
      "any.required": "Required",
    }),
});

module.exports = schema;
