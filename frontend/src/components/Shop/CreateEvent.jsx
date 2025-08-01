import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../constants/data";
import { toast } from "react-toastify";
import {
  clearErrors,
  clearMessages,
  createEvent,
} from "../../redux/reducers/event";
import { useFormik } from "formik";
import { createEventSchema } from "../../schemas/createEvent";
import ErrorBox from "../Error/ErrorBox";
import Error from "../Error/Error";

const CreateEvent = () => {
  // const { seller } = useSelector((state) => state.seller);
  const { error, success } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [minDate, setMinDate] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard/events");
    }
    dispatch(clearMessages());
    dispatch(clearErrors());
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

  const onSubmit = (values) => {
    if (!images.length) {
      toast.error("Add atleast one image");
      setIsSubmitting(false);
      return;
    }

    const { start_Date, finish_Date, ...rest } = values;
    const body = {
      ...rest,
      images,
      start_Date: new Date(start_Date)?.toISOString(),
      finish_Date: new Date(finish_Date)?.toISOString(),
    };
    dispatch(createEvent({ body }));
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
    setIsSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tags: "",
      originalPrice: undefined,
      discountPrice: undefined,
      stock: undefined,
      start_Date: null,
      finish_Date: null,
    },
    validationSchema: createEventSchema,
    onSubmit,
  });

  useEffect(() => {
    if (values.start_Date) {
      const start = new Date(values.start_Date);
      const finish = new Date(start);
      finish.setDate(start.getDate() + 3);
      // Format as yyyy-mm-dd for input type="date"
      const yyyy = finish.getFullYear();
      const mm = String(finish.getMonth() + 1).padStart(2, "0");
      const dd = String(finish.getDate()).padStart(2, "0");
      const finishDateStr = `${yyyy}-${mm}-${dd}`;
      setFieldValue("finish_Date", finishDateStr);
      setMinDate(new Date(finishDateStr));
    }
    // eslint-disable-next-line
  }, [values.start_Date]);

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      {/* create event form */}
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
            placeholder="Enter your event product name..."
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
            placeholder="Enter your event product description..."
          ></textarea>
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
            onChange={handleChange("category")}
            onBlur={handleBlur("category")}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
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
            placeholder="Enter your event product tags..."
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
            value={values.originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("originalPrice")}
            placeholder="Enter your event product price..."
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
            value={values.discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("discountPrice")}
            onBlur={handleBlur("discountPrice")}
            placeholder="Enter your event product price with discount..."
          />
          <ErrorBox>
            {errors.discountPrice && touched.discountPrice && (
              <Error>{errors.tags}</Error>
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
            value={values.stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("stock")}
            onBlur={handleBlur("stock")}
            placeholder="Enter your event product stock..."
          />
          <ErrorBox>
            {errors.stock && touched.stock && <Error>{errors.stock}</Error>}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="start_Date"
            id="start-date"
            value={values.start_Date}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            // onChange={handleStartDateChange}
            onChange={handleChange("start_Date")}
            min={today}
            placeholder="Enter your event product stock..."
          />
          <ErrorBox>
            {errors.start_Date && touched.start_Date && (
              <Error>{errors.start_Date}</Error>
            )}
          </ErrorBox>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="finsih_Date"
            id="finish-date"
            value={values.finish_Date}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("finish_Date")}
            min={minDate}
            placeholder="Enter your event product stock..."
          />
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
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Creating..." : "Create"}
              className={`mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
