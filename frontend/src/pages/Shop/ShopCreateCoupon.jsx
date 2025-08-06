import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import CreateCoupon from "../../components/Shop/CreateCoupon";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopCreateEvent = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full bg-[var(--color-background)]">
        <div className="w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <CreateCoupon />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvent;
