const Joi = require("joi");

const schema = Joi
  .object({
    name: Joi.string().required().messages({
      "any.required": "Required",
      "string.base": "Name must be a string",
    }),

    value: Joi.number().min(0).required().messages({
      "number.min": "Price can not be less than 0",
      "any.required": "Required",
    }),

    minAmount: Joi.number().min(0).messages({
      "number.min": "Minimum amount can not be less than 0",
    }),

    maxAmount: Joi.number().min(0).messages({
      "number.min": "Maximum Amount can not be less than 0",
    }),

    selectedProduct: Joi.string().optional(),
  })
  .custom((obj, helpers) => {
    if (
      obj.minAmount !== undefined &&
      obj.maxAmount &&
      obj.minAmount > obj.maxAmount
    ) {
      return helpers.message("Minimum amount must be less than original price");
    }
    return obj;
  });

module.exports = schema;
