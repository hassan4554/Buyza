import * as yup from "yup";

const reqError = "Required";
export const signupSchema = yup.object().shape({
  email: yup.string().email().required(reqError),
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Name can contain only alphabets")
    .required(reqError),
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
