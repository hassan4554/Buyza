import React from "react";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Payment from "../components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <div className="py-4 bg-[var(--color-background)]"></div>
      <CheckoutSteps active={2} />
      <Payment />
      <div className="py-4 bg-[var(--color-background)]"></div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
