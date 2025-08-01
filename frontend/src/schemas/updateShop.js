import * as Yup from "yup";

export const updateShopSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot be longer than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .required("Name is required"),

  description: Yup.string().optional(),

  zipCode: Yup.number().optional(),

  phoneNumber: Yup.number()
    .transform((value, originalValue) => {
      return String(originalValue).trim() === "" ? undefined : value;
    })
    .test("len", "Phone number must be 11 to 12 digits", (value) => {
      if (value === undefined) return true; // skip if not provided
      const length = value.toString().length;
      return length >= 11 && length <= 12;
    })
    .typeError("Phone number must be a number"),

  address: Yup.string()
    .required("Address is required")
    .typeError("Address must be a string"),
});
