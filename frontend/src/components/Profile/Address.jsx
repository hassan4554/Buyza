import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../constants/styles";
import { ADDRESS_TYPE } from "../../constants/data";
import { useFormik } from "formik";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { addAddressSchema } from "../../schemas/UpdateUser";
import ErrorBox from "../Error/ErrorBox";
import Error from "../Error/Error";
import {
  add_address,
  clearErrors,
  clearMessages,
  delete_address,
} from "../../redux/reducers/user";
const Address = () => {
  const [open, setOpen] = useState(false);
  const { user, error, successMessage } = useSelector((state) => state.user);
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

  const onSubmit = async (values) => {
    dispatch(add_address(values));
  };

  const {
    values,
    isSubmitting,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      country: "",
      state: "",
      zipCode: null,
      address1: "",
      address2: "",
      addressType: "",
    },
    validationSchema: addAddressSchema,
    onSubmit,
  });

  const handleDelete = (id) => {
    console.log(id);
    console.log("handle delete called");
    dispatch(delete_address(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={values.country}
                      onChange={handleChange("country")}
                      onBlur={handleBlur("country")}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <ErrorBox>
                      {errors.country && touched.country && (
                        <Error>{errors.country}</Error>
                      )}
                    </ErrorBox>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={values.state}
                      onChange={handleChange("state")}
                      onBlur={handleBlur("state")}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your state
                      </option>
                      {State &&
                        State.getStatesOfCountry(values.country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <ErrorBox>
                      {errors.state && touched.state && (
                        <Error>{errors.state}</Error>
                      )}
                    </ErrorBox>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={values.address1}
                      onChange={handleChange("address1")}
                      onBlur={handleBlur("address1")}
                    />
                    <ErrorBox>
                      {errors.address1 && touched.address1 && (
                        <Error>{errors.address1}</Error>
                      )}
                    </ErrorBox>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      value={values.address2}
                      onChange={handleChange("address2")}
                      onBlur={handleBlur("address2")}
                    />
                    <ErrorBox>
                      {errors.address2 && touched.address2 && (
                        <Error>{errors.address2}</Error>
                      )}
                    </ErrorBox>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      min={0}
                      value={values.zipCode}
                      onChange={handleChange("zipCode")}
                      onBlur={handleBlur("zipCode")}
                    />
                    <ErrorBox>
                      {errors.zipCode && touched.zipCode && (
                        <Error>{errors.zipCode}</Error>
                      )}
                    </ErrorBox>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={values.addressType}
                      onChange={handleChange("addressType")}
                      onBlur={handleBlur("addressType")}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {ADDRESS_TYPE &&
                        ADDRESS_TYPE.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <ErrorBox>
                      {errors.addressType && touched.addressType && (
                        <Error>{errors.addressType}</Error>
                      )}
                    </ErrorBox>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      value={isSubmitting ? "Submitting..." : "Submit"}
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        ))}

      {user && !user.addresses.length && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};

export default Address;
