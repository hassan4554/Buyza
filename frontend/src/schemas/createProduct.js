import * as yup from "yup";
import { categoriesData } from "../constants/data";

const CATEGORY_ENUM = categoriesData.map((cat) => cat.title);

export const createProductSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  category: yup
    .string()
    .oneOf(CATEGORY_ENUM, "Select a valid category")
    .required("Required"),
  tags: yup.string().optional(),
  originalPrice: yup.number().min(0, "Price can not be less than 0").optional(),
  discountPrice: yup
    .number()
    .min(0, "Price can not be less than 0")
    .required("Required")
    .when("originalPrice", (originalPrice, schema) =>
      schema.max(
        originalPrice,
        "Discount price must be less than original price"
      )
    ),
  stock: yup
    .number()
    .min(1, "Stock can not be less than 1")
    .required("Required"),
});
