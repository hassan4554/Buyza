const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z \s]+$/)
    .required()
    .messages({
      "string.min": "Name must be at least 3 characters long",
      "string.pattern.base": "Name can only contain letters and spaces",
      "any.required": "Name is required",
    }),

  description: Joi.string().optional(),

  zipCode: Joi.number().optional(),

  phoneNumber: Joi.number()
    .optional()
    .custom((value, helpers) => {
      const str = value.toString();
      if (str.length < 11 || str.length > 12) {
        return helpers.message("Phone number must be 11 to 12 digits");
      }
      return value;
    })
    .messages({
      "number.base": "Phone number must be a number",
      "any.required": "Required",
    }),

  address: Joi.string().required().messages({
    "string.base": "Address must be a string",
    "any.required": "Address is required",
  }),
});

module.exports = schema;
