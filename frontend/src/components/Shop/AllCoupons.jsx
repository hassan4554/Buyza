import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import {
  getAllCouponsByShop,
  deleteCoupon,
  updateCouponsData,
  clearErrors,
  clearMessages,
} from "../../redux/reducers/coupon";

const AllCoupons = () => {
  const { seller } = useSelector((state) => state.seller);
  const {
    data: coupons,
    isLoadingByShop,
    success,
    error,
  } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      dispatch(clearErrors());
      dispatch(clearMessages());
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    dispatch(getAllCouponsByShop({ shopId: seller._id }));
    //eslint-disable-next-line
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteCoupon({ id }));
    const newData = coupons.filter((p) => p._id !== id);
    dispatch(updateCouponsData(newData));
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoadingByShop ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-[var(--color-background)]">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllCoupons;
