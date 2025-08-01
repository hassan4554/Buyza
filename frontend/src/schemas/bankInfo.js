import * as yup from "yup";
import { Country } from "country-state-city";
const COUNTRIES = Country.getAllCountries().map((item) => item.name);

export const bankInfoSchema = yup.object().shape({
  bankName: yup.string().required("Required"),

  bankCountry: yup
    .string()
    .oneOf(COUNTRIES, "Select a valid country")
    .required("Required"),

  bankSwiftCode: yup
    .string()
    .matches(
      /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
      "Invalid SWIFT code format"
    )
    .required("SWIFT code is required"),

  bankAccountNumber: yup
    .number()
    .typeError("Bank account number must be a number")
    .test("len", "Account number must be 8 to 20 digits", (value) => {
      if (value === undefined || value === null) return false;
      const len = value.toString().length;
      return len >= 8 && len <= 20;
    })
    .required("Bank account number is required"),

  bankHolderName: yup.string().required("Required"),

  bankAddress: yup.string().required(),
});
