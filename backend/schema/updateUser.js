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

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().required(),

  phoneNumber: Joi.number()
    .required()
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
});

module.exports = schema;
