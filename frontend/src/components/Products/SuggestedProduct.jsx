import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../constants/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.product);

  const [productsData, setProductsData] = useState();

  useEffect(() => {
    const d =
      allProducts &&
      allProducts.filter(
        (i) => i.category === data.category && i._id !== data._id
      );
    setProductsData(d);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {productsData?.length ? (
        <div className={`py-4 px-20 w-full bg-[var(--color-background)]`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {productsData &&
              productsData.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
