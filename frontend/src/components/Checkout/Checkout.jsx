import React, { useState } from "react";
import styles from "../../constants/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import ShippingInfo from "./ShippingInfo";
import CartData from "./CartData";
import { requestWrapper } from "../../utils/request_wrapper";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.product);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let data = [];
    cart.forEach((item) => {
      let i = allProducts.find((product) => product._id === item.id);
      i && data.push({ ...i, qty: item.qty });
    });

    setCartItem(data);
  }, [cart, allProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (address1 === "" || zipCode === null || country === "" || city === "") {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        state: city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cartItem.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await requestWrapper(
      `${server}/coupon/get?name=${couponCode}`,
      {},
      "GET",
      "application/json"
    );

    if (res.status !== 200) {
      toast.error(res.response.data.error);
      return;
    }
    const shopId = res.data.data.shopId._id;
    const { value } = res.data.data;

    const isCouponValid =
      cartItem && cartItem.filter((item) => item.shopId._id === shopId);

    if (!isCouponValid.length) {
      toast.error("Coupon code is not valid for this shop");
      setCouponCode("");
      return;
    }
    const eligiblePrice = isCouponValid.reduce(
      (acc, item) => acc + item.qty * item.discountPrice,
      0
    );
    const discountPrice = (eligiblePrice * value) / 100;
    setDiscountPrice(discountPrice);
    setCouponCodeData(res.data.data);
    setCouponCode("");
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8 bg-[var(--color-background)]">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

export default Checkout;
