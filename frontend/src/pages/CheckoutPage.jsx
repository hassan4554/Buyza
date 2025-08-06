import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps.jsx";
import Checkout from "../components/Checkout/Checkout.jsx";
import Footer from "../components/Layout/Footer";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <div className="py-4 bg-[var(--color-background)]"></div>
      <CheckoutSteps active={1} />
      <Checkout />
      <div className="py-4 bg-[var(--color-background)]"></div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
