const Joi = require("joi");
const { ADDRESS_TYPE } = require("../constants");

const schema = Joi.object({
  country: Joi.string().required().messages({
    "any.required": "Required",
    "string.empty": "Required",
  }),
  state: Joi.string().required().messages({
    "any.required": "Required",
    "string.empty": "Required",
  }),
  addressType: Joi.string()
    .valid(...ADDRESS_TYPE)
    .required()
    .messages({
      "any.only": "Select a valid address type",
      "any.required": "Required",
      "string.empty": "Required",
    }),
  address1: Joi.string().required().messages({
    "any.required": "Required",
    "string.empty": "Required",
  }),
  address2: Joi.string().allow(""),
  zipCode: Joi.number().optional(),
});

module.exports = schema;
