import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email").required("Required"),
  password: yup.string().required("Required"),
});
