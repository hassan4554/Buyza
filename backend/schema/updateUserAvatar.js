const Joi = require("joi");

const schema = Joi.object({
  image: Joi.string().base64().required().messages({
    "string.base64": "Image must be a valid base64 string",
    "any.required": "Image is required",
  }),
});

module.exports = schema;
