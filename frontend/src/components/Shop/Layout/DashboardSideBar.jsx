import { Link } from "react-router-dom";
import { DASHBOARD_NAV_ITEMS } from "../../../constants/data";
import { useState } from "react";

const DashboardSideBar = ({ active = 1 }) => {
  const [activeItem, setActiveItem] = useState(active);
  return (
    <div className="w-full max-w-[250px] h-[90vh] bg-[var(--color-background)] pb-10 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {DASHBOARD_NAV_ITEMS.map((item, index) => {
        return (
          <div
            className="w-full flex items-center p-4"
            key={item.id}
            onClick={() => setActiveItem(index + 1)}
          >
            <Link to={item.link} className="w-full flex items-center">
              <item.icon
                size={30}
                color={`${item.id === activeItem ? "crimson" : "#555"}`}
              />
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  item.id === activeItem ? "text-[crimson]" : "text-[#555]"
                }`}
              >
                {item.name}
              </h5>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardSideBar;
