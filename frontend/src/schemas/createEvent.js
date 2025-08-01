import * as Yup from "yup";
import { categoriesData } from "../constants/data";

const CATEGORY_ENUM = categoriesData.map((cat) => cat.title);

export const createEventSchema = Yup.object()
  .shape({
    name: Yup.string().required("Required"),

    description: Yup.string().required("Required"),

    category: Yup.string()
      .oneOf(CATEGORY_ENUM, "Select a valid category")
      .required("Required"),

    status: Yup.string().optional(),

    tags: Yup.string().optional(),

    start_Date: Yup.date()
      .typeError("Start date must be a valid date")
      .required("Start date is required"),

    finish_Date: Yup.date()
      .typeError("Finish date must be a valid date")
      .required("Finish date is required"),

    originalPrice: Yup.number()
      .min(0, "Price can not be less than 0")
      .optional(),

    discountPrice: Yup.number()
      .min(0, "Price can not be less than 0")
      .required("Required")
      .when("originalPrice", (originalPrice, schema) =>
        originalPrice !== undefined
          ? schema.max(
              originalPrice,
              "Discount price must be less than original price"
            )
          : schema
      ),

    stock: Yup.number()
      .min(1, "Stock can not be less than 1")
      .required("Required"),

    // images: Yup.array()
    //   .of(Yup.string().url("Each avatar must be a valid URL"))
    //   .required("Images is required")
    //   .typeError("Images must be an array"),
  })
  .test(
    "start-less-than-finish",
    "Start date must be less than finish date",
    function (value) {
      const { start_Date, finish_Date } = value || {};
      if (start_Date && finish_Date) {
        return new Date(start_Date) < new Date(finish_Date);
      }
      return true; // skip if either is missing — other .required() will handle that
    }
  );
