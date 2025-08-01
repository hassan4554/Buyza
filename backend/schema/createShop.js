const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Required",
    "any.required": "Required",
  }),

  name: Joi.string()
    .pattern(/^[A-Za-z0-9 ]+$/)
    .required()
    .messages({
      "string.pattern.base": "Name can contain only alphabets",
      "string.empty": "Required",
      "any.required": "Required",
    }),

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

  zipCode: Joi.number().required().messages({
    "number.base": "Zip code must be a number",
    "any.required": "Required",
  }),

  address: Joi.string().required().messages({
    "string.empty": "Required",
    "any.required": "Required",
  }),

  avatar: Joi.string().uri().required().messages({
    "string.uri": "Avatar must be a valid URL",
    "any.required": "Avatar is required",
  }),

  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[a-z]/, "lowercase")
    .pattern(/\d/, "digit")
    .pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "special")
    .required()
    .messages({
      "string.min": "Password must be atleast 8 characters",
      "string.pattern.name":
        "Password must contain at least 1 {#name} letter/character",
      "string.empty": "Required",
      "any.required": "Required",
    }),

  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Required",
  }),
});

module.exports = schema;
