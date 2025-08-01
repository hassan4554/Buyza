const Joi = require("joi");
const { RATINGS } = require("../constants");

const schema = Joi.object({
  productId: Joi.string().length(24).hex().required().messages({
    "string.length": "Product Id must be 24 characters long",
    "string.hex": "Product Id must be a valid hexadecimal",
    "any.required": "Required",
  }),
  // orderId: Joi.string().length(24).hex().required().messages({
  //   "string.length": "Order Id must be 24 characters long",
  //   "string.hex": "Order Id must be a valid hexadecimal",
  //   "any.required": "Required",
  // }),
  rating: Joi.number()
    .valid(...RATINGS)
    .required()
    .messages({
      "any.only": "Select a valid rating",
      "any.required": "Required",
    }),
  comment: Joi.string().required().messages({
    "any.required": "Required",
    "string.base": "Comment must be a string",
  }),
});

module.exports = schema;
