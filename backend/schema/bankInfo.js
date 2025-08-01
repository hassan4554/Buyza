const Joi = require("joi");
const { Country } = require("country-state-city");
const COUNTRIES = Country.getAllCountries().map((item) => item.name);

const schema = Joi.object({
  bankName: Joi.string().required().messages({
    "any.required": "Bank name is required",
    "string.base": "Bank name must be a string",
  }),

  bankCountry: Joi.string()
    .valid(...COUNTRIES)
    .required()
    .messages({
      "any.only": "Select a valid country",
      "any.required": "Bank country name is required",
    }),

  bankSwiftCode: Joi.string()
    .pattern(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid SWIFT code format",
      "any.required": "SWIFT code is required",
    }),

  bankAccountNumber: Joi.number()
    .required()
    .custom((value, helpers) => {
      const len = value.toString().length;
      if (len < 8 || len > 20) {
        return helpers.message("Account number must be 8 to 20 digits");
      }
      return value;
    })
    .messages({
      "number.base": "Bank account number must be a number",
      "any.required": "Bank account number is required",
    }),

  bankHolderName: Joi.string().required().messages({
    "any.required": "Bank holder name is required",
    "string.base": "Bank holder name must be a string",
  }),

  bankAddress: Joi.string().required().messages({
    "any.required": "Bank address is required",
    "string.base": "Bank address must be a string",
  }),
});

module.exports = schema;
