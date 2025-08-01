import { useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../../constants/styles";
import { useFormik } from "formik";
import { updateUserPasswordSchema } from "../../schemas/UpdateUser";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearMessages,
  update_password,
} from "../../redux/reducers/user";
import ErrorBox from "../Error/ErrorBox";
import Error from "../Error/Error";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.user);

  const onSubmit = async (values) => {
    dispatch(update_password(values));
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: updateUserPasswordSchema,
    onSubmit,
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
      resetForm();
    }
  }, [error, successMessage, dispatch, resetForm]);

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Old password</label>
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

          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">New password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={values.newPassword}
              onChange={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
            />
            <ErrorBox>
              {errors.newPassword && touched.newPassword && (
                <Error>{errors.newPassword}</Error>
              )}
            </ErrorBox>
          </div>

          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Confirm new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={values.confirmNewPassword}
              onChange={handleChange("confirmNewPassword")}
              onBlur={handleBlur("confirmNewPassword")}
            />
            <ErrorBox>
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <Error>{errors.confirmNewPassword}</Error>
              )}
            </ErrorBox>
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value={isSubmitting ? "Submitting..." : "Submit"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
