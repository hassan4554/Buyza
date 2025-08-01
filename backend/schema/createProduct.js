const Joi = require("joi");
const { CATEGORIES } = require("../constants/");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Required",
    "string.base": "Name must be a string",
  }),

  description: Joi.string().required().messages({
    "any.required": "Required",
    "string.base": "Description must be a string",
  }),

  category: Joi.string()
    .valid(...CATEGORIES)
    .required()
    .messages({
      "any.only": "Select a valid category",
      "any.required": "Required",
    }),

  tags: Joi.string().optional(),

  originalPrice: Joi.number().min(0).messages({
    "number.min": "Price can not be less than 0",
  }),

  discountPrice: Joi.number().min(0).required().messages({
    "number.min": "Price can not be less than 0",
    "any.required": "Required",
  }),

  stock: Joi.number().min(1).required().messages({
    "number.min": "Stock can not be less than 1",
    "any.required": "Required",
  }),

  images: Joi.array()
    .items(
      Joi.string().uri().messages({
        "string.uri": "Each avatar must be a valid URL",
      })
    )
    .required()
    .messages({
      "array.base": "Images must be an array",
      "any.required": "Images is required",
    }),
}).custom((obj, helpers) => {
  if (
    obj.originalPrice !== undefined &&
    obj.discountPrice > obj.originalPrice
  ) {
    return helpers.message("Discount price must be less than original price");
  }
  return obj;
});

module.exports = schema;
