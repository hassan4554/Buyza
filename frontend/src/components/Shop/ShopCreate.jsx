import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../constants/styles";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { useFormik } from "formik";
import ErrorBox from "../Error/ErrorBox";
import Error from "../Error/Error";
import { shopCreateSchema } from "../../schemas/shopCreate";
import { requestWrapper } from "../../utils/request_wrapper";

const ShopCreate = () => {
  const [avatar, setAvatar] = useState();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const res = await requestWrapper(
      `${server}/shop/create`,
      { ...values, avatar },
      "POST",
      "application/json"
    );

    if (res.status === 200) {
      toast.success(res.data.message);
      resetForm();
      navigate("/shop/login");
      return;
    }
    toast.error(res.data.error);
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
      name: "",
      email: "",
      phoneNumber: null,
      zipCode: null,
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: shopCreateSchema,
    onSubmit,
  });

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  required
                  value={values.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <ErrorBox>
                {errors.name && touched.name && <Error>{errors.name}</Error>}
              </ErrorBox>
            </div>

            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone-number"
                  required
                  value={values.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <ErrorBox>
                {errors.phoneNumber && touched.phoneNumber && (
                  <Error>{errors.phoneNumber}</Error>
                )}
              </ErrorBox>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <ErrorBox>
                {errors.email && touched.email && <Error>{errors.email}</Error>}
              </ErrorBox>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  required
                  value={values.address}
                  onChange={handleChange("address")}
                  onBlur={handleBlur("address")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <ErrorBox>
                {errors.address && touched.address && (
                  <Error>{errors.address}</Error>
                )}
              </ErrorBox>
            </div>

            <div>
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipcode"
                  min={0}
                  required
                  value={values.zipCode}
                  onChange={handleChange("zipCode")}
                  onBlur={handleBlur("zipCode")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <ErrorBox>
                {errors.zipCode && touched.zipCode && (
                  <Error>{errors.zipCode}</Error>
                )}
              </ErrorBox>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  required
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <ErrorBox>
                {errors.password && touched.password && (
                  <Error>{errors.password}</Error>
                )}
              </ErrorBox>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="off"
                  required
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <ErrorBox>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Error>{errors.confirmPassword}</Error>
                )}
              </ErrorBox>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/shop/login" className="text-blue-600 pl-2">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
