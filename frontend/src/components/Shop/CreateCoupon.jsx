import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearErrors,
  clearMessages,
  createCoupon,
} from "../../redux/reducers/coupon";
import { useFormik } from "formik";
import { createCouponSchema } from "../../schemas/createCoupon";
import ErrorBox from "../Error/ErrorBox";
import Error from "../Error/Error";
import { getAllProductsByShop } from "../../redux/reducers/product";

const CreateEvent = () => {
  const { data: products } = useSelector((state) => state.product);
  const { error, success } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsByShop({ shopId: seller._id }));
    //eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Coupon created successfully!");
      navigate("/dashboard/coupons");
    }
    dispatch(clearMessages());
    dispatch(clearErrors());
  }, [dispatch, error, success, navigate]);

  const onSubmit = (values) => {
    dispatch(createCoupon({ body: values }));
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
      selectedProduct: "",
      minAmount: undefined,
      maxAmount: undefined,
      value: undefined,
    },
    validationSchema: createCouponSchema,
    onSubmit,
  });

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">
        Create Discount Code
      </h5>
      {/* create coupon form */}
      <form onSubmit={handleSubmit}>
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
        <div>
          <label className="pb-2">Selected Product</label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={values.selectedProduct}
            onChange={handleChange("selectedProduct")}
            onBlur={handleBlur("selectedProduct")}
          >
            <option value="Choose your selected products">
              Choose a selected product
            </option>
            {products &&
              products.map((i) => (
                <option value={i.name} key={i.name}>
                  {i.name}
                </option>
              ))}
          </select>
          <ErrorBox>{errors.name && touched.name && <Error></Error>}</ErrorBox>
        </div>
        <div>
          <label className="pb-2">
            Discount Percentenge<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="value"
            value={values.value}
            min={0}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("value")}
            onBlur={handleBlur("value")}
            placeholder="Enter the coupon's value..."
          />
          <ErrorBox>
            {errors.value && touched.value && <Error>{errors.value}</Error>}
          </ErrorBox>
        </div>
        <div>
          <label className="pb-2">Minimum Amount</label>
          <input
            type="number"
            name="minAmount"
            min={0}
            value={values.minAmount}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("minAmount")}
            onBlur={handleBlur("minAmount")}
            placeholder="Enter minimum amoount for coupon..."
          />
          <ErrorBox>
            {errors.minAmount && touched.minAmount && (
              <Error>{errors.minAmount}</Error>
            )}
          </ErrorBox>
        </div>
        <div>
          <label className="pb-2">Maximum Amount</label>
          <input
            type="number"
            name="maxAmount"
            min={0}
            value={values.maxAmount}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleChange("maxAmount")}
            onBlur={handleBlur("maxAmount")}
            placeholder="Enter maximum amoount for coupon..."
          />
          <ErrorBox>
            {errors.maxAmount && touched.maxAmount && (
              <Error>{errors.maxAmount}</Error>
            )}
          </ErrorBox>
        </div>

        <div>
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Creating..." : "Create"}
            className={`mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
