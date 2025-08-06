import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/reducers/order";
import styles from "../../constants/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { get_shop } from "../../redux/reducers/seller";
import { useFormik } from "formik";
import { Country } from "country-state-city";
import ErrorBox from "../Error/ErrorBox";
import Error from "../Error/Error";
import { bankInfoSchema } from "../../schemas/bankInfo";
import { requestWrapper } from "../../utils/request_wrapper";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);

  useEffect(() => {
    dispatch(getAllOrdersOfShop({}));
  }, [dispatch]);

  const onSubmit = async (values) => {
    console.log(values);
    setPaymentMethod(false);

    const res = await requestWrapper(
      `${server}/shop/update-payment-method`,
      values,
      "PATCH",
      "application/json"
    );

    console.log(res);
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
      bankName: "",
      bankCountry: "",
      bankSwiftCode: null,
      bankAccountNumber: null,
      bankHolderName: "",
      bankAddress: "",
    },
    validationSchema: bankInfoSchema,
    onSubmit,
  });

  const deleteHandler = async () => {
    const res = await requestWrapper(
      `${server}/shop/delete-withdraw-method`,
      {},
      "DELETE",
      "application/json"
    );
    console.log(res);
    if (res.status !== 200) {
      toast.error(res.response.data.error);
      return;
    }
    toast.success(res.data.message);
    dispatch(get_shop({}));
  };

  const error = () => {
    toast.error("You not have enough balance to withdraw!");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      const amount = withdrawAmount;
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          toast.success("Withdraw money request is successful!");
        });
    }
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-[var(--color-background)] h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add new Withdraw Method:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="font-bold">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={values.bankName}
                      onChange={handleChange("bankName")}
                      onBlur={handleBlur("bankName")}
                      id=""
                      placeholder="Bank name!"
                      className={`${styles.input} mt-2`}
                    />
                    <ErrorBox>
                      {errors.bankName && touched.bankName && (
                        <Error>{errors.bankName}</Error>
                      )}
                    </ErrorBox>
                  </div>
                  <div className="pt-2">
                    <label className="font-bold">
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name=""
                      id=""
                      value={values.bankCountry}
                      onChange={handleChange("bankCountry")}
                      onBlur={handleBlur("bankCountry")}
                      className="w-full border h-[40px] rounded-[5px] hover:cursor-pointer"
                    >
                      <option
                        value=""
                        className="block border pb-2 text-gray-400"
                      >
                        Bank Country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <ErrorBox>
                      {errors.bankCountry && touched.bankCountry && (
                        <Error>{errors.bankCountry}</Error>
                      )}
                    </ErrorBox>
                  </div>
                  <div className="pt-2">
                    <label className="font-bold">
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={values.bankSwiftCode}
                      onChange={handleChange("bankSwiftCode")}
                      onBlur={handleBlur("bankSwiftCode")}
                      placeholder="Bank Swift Code!"
                      className={`${styles.input} mt-2`}
                    />
                    <ErrorBox>
                      {errors.bankSwiftCode && touched.bankSwiftCode && (
                        <Error>{errors.bankSwiftCode}</Error>
                      )}
                    </ErrorBox>
                  </div>

                  <div className="pt-2">
                    <label className="font-bold">
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      value={values.bankAccountNumber}
                      onChange={handleChange("bankAccountNumber")}
                      onBlur={handleBlur("bankAccountNumber")}
                      required
                      placeholder="Bank account number!"
                      className={`${styles.input} mt-2`}
                    />
                    <ErrorBox>
                      {errors.bankAccountNumber &&
                        touched.bankAccountNumber && (
                          <Error>{errors.bankAccountNumber}</Error>
                        )}
                    </ErrorBox>
                  </div>
                  <div className="pt-2">
                    <label className="font-bold">
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={values.bankHolderName}
                      onChange={handleChange("bankHolderName")}
                      onBlur={handleBlur("bankHolderName")}
                      id=""
                      placeholder="Bank Holder name!"
                      className={`${styles.input} mt-2`}
                    />
                    <ErrorBox>
                      {errors.bankHolderName && touched.bankHolderName && (
                        <Error>{errors.bankHolderName}</Error>
                      )}
                    </ErrorBox>
                  </div>

                  <div className="pt-2">
                    <label className="font-bold">
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      id=""
                      value={values.bankAddress}
                      onChange={handleChange("bankAddress")}
                      onBlur={handleBlur("bankAddress")}
                      placeholder="Bank address!"
                      className={`${styles.input} mt-2`}
                    />
                    <ErrorBox>
                      {errors.bankAddress && touched.bankAddress && (
                        <Error>{errors.bankAddress}</Error>
                      )}
                    </ErrorBox>
                  </div>

                  <button
                    type="submit"
                    value={isSubmitting ? "Submitting..." : "Submit"}
                    disabled={isSubmitting}
                    className={`${styles.button} mb-3 text-white`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins text-center mb-3">
                  Available Withdraw Methods:
                </h3>

                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="800px:flex w-full justify-between items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          <span className="font-bold">Account Number:</span>{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.toString()
                              .length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber
                              .toString()
                              .slice(-3)}
                        </h5>
                        <h5>
                          <span className="font-bold">Bank Name:</span>{" "}
                          {seller?.withdrawMethod.bankName}
                        </h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer hover:text-red-600"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>
                      <span className="font-bold">Available Balance:</span>{" "}
                      {availableBalance}$
                    </h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[100px] w-[full] border 800px:mr-3 p-1 rounded"
                      />
                      <div
                        className={`${styles.button} !h-[42px] text-white`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No Withdraw Methods available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} text-[#fff] text-[18px] mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
