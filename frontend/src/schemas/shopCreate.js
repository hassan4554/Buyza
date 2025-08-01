import * as yup from "yup";

const reqError = "Required";
export const shopCreateSchema = yup.object().shape({
  email: yup.string().email().required(reqError),
  name: yup
    .string()
    .matches(/^[A-Za-z0-9 ]+$/, "Name can contain only alphabets, digits, and spaces")
    .required(reqError),
  phoneNumber: yup
    .number()
    .typeError("Phone number must be a number")
    .test("len", "Phone number must be 11 to 12 digits", (value) => {
      if (!value) return false;
      const str = value.toString();
      return str.length >= 11 && str.length <= 12;
    })
    .required(reqError),
  zipCode: yup
    .number()
    .typeError("Zip code must be a number")
    .required(reqError),
  address: yup.string().required(reqError),
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters")
    .test(
      "uppercase",
      "Password must contain at least 1 uppercase letter",
      (value) => {
        if (!value) return true; // Let required handle empty values
        return /[A-Z]/.test(value);
      }
    )
    .test(
      "lowercase",
      "Password must contain at least 1 lowercase letter",
      (value) => {
        if (!value) return true;
        return /[a-z]/.test(value);
      }
    )
    .test("digit", "Password must contain at least 1 digit", (value) => {
      if (!value) return true;
      return /\d/.test(value);
    })
    .test(
      "special",
      "Password must contain at least 1 special character",
      (value) => {
        if (!value) return true;
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      }
    )
    .required(reqError),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(reqError),
});
