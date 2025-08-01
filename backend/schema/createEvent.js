const Joi = require("joi");
const { CATEGORIES } = require("../constants");

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

  status: Joi.string().optional(),

  tags: Joi.string().optional(),

  start_Date: Joi.date().required().messages({
    "date.base": "Start date must be a valid date",
    "any.required": "Start date is required",
  }),

  finish_Date: Joi.date().required().messages({
    "date.base": "Finish date must be a valid date",
    "any.required": "Finish date is required",
  }),

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
  if (
    obj.start_Date !== undefined &&
    obj.finish_Date !== undefined &&
    obj.start_Date >= obj.finish_Date
  ) {
    return helpers.message("Start date must be less than finish date");
  }
  return obj;
});

module.exports = schema;
