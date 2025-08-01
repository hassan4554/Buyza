import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../constants/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { useSelector } from "react-redux";
import { SHOP_HOMEPAGE_NAV } from "../../constants/data";

const ShopProfileData = ({ isOwner }) => {
  const { data: products } = useSelector((state) => state.product);
  const { data: events } = useSelector((state) => state.event);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product?.reviews).flat();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between  flex-col 800px:flex-row">
        <div className="w-full flex">
          {SHOP_HOMEPAGE_NAV.map((item) => (
            <div
              key={item.id}
              className="flex items-center"
              onClick={() => setActive(item.id)}
            >
              <h5
                className={`font-[600] text-base ${
                  active === item.id ? "text-red-500" : "text-[#333]"
                } cursor-pointer pr-[20px]`}
              >
                {item.name}
              </h5>
            </div>
          ))}
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[20px] mb-12 border-0">
          {products &&
            products.map((item, index) => (
              <ProductCard data={item} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((item, index) => (
                <ProductCard
                  data={item}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Events have for this shop!
            </h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4" key={index}>
                <img
                  src={`${item.user.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews have for this shop!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
