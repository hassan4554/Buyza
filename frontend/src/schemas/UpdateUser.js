import * as yup from "yup";
import { ADDRESS_TYPE } from "../constants/data";

const Address_Enum = ADDRESS_TYPE.map((i) => i.name);

export const updateUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email"),
  name: yup.string().matches(/^[A-Za-z ]+$/, "Name can contain only alphabets"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .test(
      "uppercase",
      "Password must contain at least 1 uppercase letter",
      (value) => !value || /[A-Z]/.test(value)
    )
    .test(
      "lowercase",
      "Password must contain at least 1 lowercase letter",
      (value) => !value || /[a-z]/.test(value)
    )
    .test(
      "digit",
      "Password must contain at least 1 digit",
      (value) => !value || /\d/.test(value)
    )
    .test(
      "special",
      "Password must contain at least 1 special character",
      (value) => !value || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    ),
  phoneNumber: yup
    .string()
    .matches(
      /^\d{11,12}$/,
      "Phone number must be a number with 11 to 12 digits"
    ),
});

export const updateUserPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .test(
      "uppercase",
      "Password must contain at least 1 uppercase letter",
      (value) => !value || /[A-Z]/.test(value)
    )
    .test(
      "lowercase",
      "Password must contain at least 1 lowercase letter",
      (value) => !value || /[a-z]/.test(value)
    )
    .test(
      "digit",
      "Password must contain at least 1 digit",
      (value) => !value || /\d/.test(value)
    )
    .test(
      "special",
      "Password must contain at least 1 special character",
      (value) => !value || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "New Passwords must match")
    .required("Required"),
});

export const addAddressSchema = yup.object().shape({
  country: yup.string().required("Required"),
  state: yup.string().required("Required"),
  addressType: yup
    .string()
    .oneOf(Address_Enum, "Select a valid address type")
    .required("Required"),
  address1: yup.string().required("Required"),
  address2: yup.string(),
  zipCode: yup.number(),
});
