import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  clearErrors,
  clearMessages,
} from "../../redux/reducers/product";
import { categoriesData } from "../../constants/data";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import ErrorBox from "../Error/ErrorBox";
import Error from "../Error/Error";
import { RxCross1 } from "react-icons/rx";
import { createProductSchema } from "../../schemas/createProduct";
import PageLoader from "../Layout/PageLoader";

const CreateProduct = () => {
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(false);

  const [images, setImages] = useState([]);

  useEffect(() => {
    setPageLoading(false);
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      navigate("/dashboard/products");
      dispatch(clearErrors());
      dispatch(clearMessages());
    }
  }, [dispatch, error, success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (values) => {
    if (!images.length) {
      toast.error("Enter atleast one image of product!");
      return;
    }
    const body = {
      ...values,
      images,
    };

    setPageLoading(true);
    dispatch(createProduct({ body }));
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tags: "",
      originalPrice: undefined,
      discountPrice: undefined,
      stock: undefined,
    },
    validationSchema: createProductSchema,
    onSubmit,
  });

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      {pageLoading && <PageLoader />}
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="Enter your product name..."
          />
          <ErrorBox>
            {errors.name && touched.name && <Error>{errors.name}</Error>}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={values.description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("description")}
            onBlur={handleBlur("description")}
            placeholder="Enter your product description..."
          />
          <ErrorBox>
            {errors.description && touched.description && (
              <Error>{errors.description}</Error>
            )}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={values.category}
            name="category"
            onChange={handleChange("category")}
            onBlur={handleBlur("category")}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option value={item.title} key={item.title}>
                  {item.title}
                </option>
              ))}
          </select>
          <ErrorBox>
            {errors.category && touched.category && (
              <Error>{errors.category}</Error>
            )}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={values.tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("tags")}
            onBlur={handleBlur("tags")}
            placeholder="Enter your product tags..."
          />
          <ErrorBox>
            {errors.tags && touched.tags && <Error>{errors.tags}</Error>}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            min={0}
            value={values.originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("originalPrice")}
            onBlur={handleBlur("originalPrice")}
            placeholder="Enter your product price..."
          />
          <ErrorBox>
            {errors.originalPrice && touched.originalPrice && (
              <Error>{errors.originalPrice}</Error>
            )}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Discounted Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discountPrice"
            min={0}
            value={values.discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("discountPrice")}
            onBlur={handleBlur("discountPrice")}
            placeholder="Enter your product price with discount..."
          />
          <ErrorBox>
            {errors.discountPrice && touched.discountPrice && (
              <Error>{errors.discountPrice}</Error>
            )}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            min={1}
            value={values.stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("stock")}
            onBlur={handleBlur("stock")}
            placeholder="Enter your product stock..."
          />
          <ErrorBox>
            {errors.stock && touched.stock && <Error>{errors.stock}</Error>}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((img, index) => (
                <div className="relative" key={index}>
                  <RxCross1
                    className="text-red-600 text-base bg-black/30 rounded-full p-1 absolute hover:cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  />
                  <img
                    src={img}
                    key={img}
                    alt="Product image"
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                </div>
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Creating..." : "Create"}
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
