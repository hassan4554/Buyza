import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../constants/styles";
import { get_shop } from "../../redux/reducers/seller";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Error from "../Error/Error";
import ErrorBox from "../Error/ErrorBox";
import { requestWrapper } from "../../utils/request_wrapper";
import { updateShopSchema } from "../../schemas/updateShop";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        const res = await requestWrapper(
          `${server}/shop/update-avatar`,
          { avatar: reader.result },
          "PATCH",
          "application/json"
        );

        if (res.status === 200) {
          toast.error(res.response.data.error);
          return;
        }
        toast.success(res.data.message);
        dispatch(get_shop({}));
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = async (values) => {
    const res = await requestWrapper(
      `${server}/shop/update`,
      values,
      "PATCH",
      "application/json"
    );

    if (res.status !== 200) {
      toast.error(res.response.data.error);
      return;
    }
    toast.success(res.data.message);
    dispatch(get_shop({}));
    resetForm();
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      name: seller?.name || "",
      description: seller?.description || "",
      address: seller?.address || "",
      zipCode: seller?.zipCode || null,
      phoneNumber: seller?.phoneNumber || null,
    },
    validationSchema: updateShopSchema,
    onSubmit,
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={avatar ? avatar : `${seller.avatar?.url}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-bold">Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}` || "name..."}
              value={values.name}
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            <ErrorBox>
              {errors.name && touched.name && <Error>{errors.name}</Error>}
            </ErrorBox>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-bold">Description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={values.description}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
            <ErrorBox>
              {errors.description && touched.description && (
                <Error>{errors.description}</Error>
              )}
            </ErrorBox>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-bold">Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address || "Address..."}
              value={values.address}
              onChange={handleChange("address")}
              onBlur={handleBlur("address")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            <ErrorBox>
              {errors.address && touched.address && (
                <Error>{errors.address}</Error>
              )}
            </ErrorBox>
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-bold">Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber || "Phone number..."}
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            <ErrorBox>
              {errors.phoneNumber && touched.phoneNumber && (
                <Error>{errors.phoneNumber}</Error>
              )}
            </ErrorBox>
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-bold">Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode || "Zipcode..."}
              value={values.zipCode}
              onChange={handleChange("zipCode")}
              onBlur={handleBlur("zipCode")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            <ErrorBox>
              {errors.zipCode && touched.zipCode && (
                <Error>{errors.zipCode}</Error>
              )}
            </ErrorBox>
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value={isSubmitting ? "Updating..." : "Update Shop"}
              disabled={isSubmitting}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 hover:cursor-pointer`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
