import * as yup from "yup";

export const createCouponSchema = yup
  .object({
    name: yup.string().required("Required").typeError("Name must be a string"),

    value: yup
      .number()
      .required("Required")
      .min(0, "Price can not be less than 0")
      .typeError("Value must be a number"),

    minAmount: yup
      .number()
      .min(0, "Minimum amount can not be less than 0")
      .nullable()
      .typeError("Minimum amount must be a number"),

    maxAmount: yup
      .number()
      .min(0, "Maximum Amount can not be less than 0")
      .nullable()
      .typeError("Maximum amount must be a number"),

    selectedProduct: yup.string().optional(),
  })
  .test(
    "min-max-check",
    "Minimum amount must be less than original price",
    function (obj) {
      const { minAmount, maxAmount } = obj;
      if (
        minAmount !== undefined &&
        minAmount !== null &&
        maxAmount !== undefined &&
        maxAmount !== null &&
        minAmount > maxAmount
      ) {
        return false;
      }
      return true;
    }
  );
