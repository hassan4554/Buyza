import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../constants/styles";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import Address from "./Address";
import { requestWrapper } from "../../utils/request_wrapper";
import {
  get_user,
  clearErrors,
  clearMessages,
  update_user,
} from "../../redux/reducers/user";
import { useFormik } from "formik";
import { updateUserSchema } from "../../schemas/UpdateUser";
import ErrorBox from "../Error/ErrorBox";
import Error from "../Error/Error";
import AllOrders from "./AllOrders";
import AllRefundOrders from "./AllRefunds";
import TrackOrder from "./AllOrdersTrack";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  //eslint-disable-next-line
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
  }, [error, successMessage, dispatch]);

  const onSubmit = (values) => {
    dispatch(update_user(values));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        const res = await requestWrapper(
          `${server}/user/update-avatar`,
          { avatar: reader.result },
          "PATCH",
          "application/json"
        );

        if (res.status === 200) {
          dispatch(get_user({}));
          toast.success(res.data.message);
          return;
        }
        toast.error(res.response.data.error);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
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
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || null,
      password: "",
    },
    validationSchema: updateUserSchema,
    onSubmit,
  });

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
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
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={values.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                  <ErrorBox>
                    {errors.name && touched.name && (
                      <Error>{errors.name}</Error>
                    )}
                  </ErrorBox>
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  <ErrorBox>
                    {errors.email && touched.email && (
                      <Error>{errors.email}</Error>
                    )}
                  </ErrorBox>
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={values.phoneNumber}
                    onChange={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                  />
                  <ErrorBox>
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Error>{errors.phoneNumber}</Error>
                    )}
                  </ErrorBox>
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <ErrorBox>
                    {errors.password && touched.password && (
                      <Error>{errors.password}</Error>
                    )}
                  </ErrorBox>
                </div>
              </div>
              <div className="text-center">
                <input
                  className={`w-full md:w-[350px] mx-auto h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  value={isSubmitting ? "Upadting..." : "Update"}
                  type="submit"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
