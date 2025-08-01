const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    "string.length": "Id must be 24 characters long",
    "string.hex": "Id must be a valid hexadecimal",
    "any.required": "Required",
  }),
});

module.exports = schema;
