import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../../constants/styles";
import Loader from "../../components/Layout/Loader";
import ShopInfo from "../../components/Shop/ShopInfo";
import { getAllEventsByShop } from "../../redux/reducers/event";
import { getAllProductsByShop } from "../../redux/reducers/product";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopPreviewPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoadingByShop: productsLoading } = useSelector(
    (state) => state.product
  );
  const { isLoadingByShop: eventsLoading } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    if (!id) return;
    dispatch(getAllProductsByShop({ shopId: id }));
    dispatch(getAllEventsByShop({ shopId: id }));
  }, [dispatch, id]);

  if (productsLoading || eventsLoading) return <Loader />;
  return (
    <div className={`${styles.section} !w-full bg-[#f5f5f5]`}>
      <div className="w-full 800px:flex px-5 py-10 justify-between">
        <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
          <ShopInfo isOwner={false} />
        </div>
        <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
