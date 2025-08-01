const { AppError } = require("../utils");

const validateData = (validationSchema, dataType = "body") => {
  return (req, res, next) => {
    const { error } = validationSchema.validate(req[dataType], {
      abortEarly: true,
    });

    if (error) return next(new AppError(error.details[0].message, 400));
    next();
  };
};

module.exports = validateData;
