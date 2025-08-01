import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../constants/styles";
import SimpleLoader from "../Layout/SimpleLoader";
import { useDispatch, useSelector } from "react-redux";
import { logoutSeller } from "../../redux/reducers/seller";
import { requestWrapper } from "../../utils/request_wrapper";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { data: products } = useSelector((state) => state.product);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      const res = await requestWrapper(
        `${server}/shop/get-shop-info?id=${id}`,
        {},
        "GET",
        "application/json"
      );
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        console.log(res.response.data.error);
      }
      setIsLoading(false);
    };

    getData();
  }, [id, dispatch]);

  const logoutHandler = async () => {
    const res = await requestWrapper(
      `${server}/shop/logout`,
      {},
      "GET",
      "application/json"
    );

    if (res.status === 200) {
      toast.success(res.data.message);
      dispatch(logoutSeller());
      navigate("/shop/login");
      return;
    }
    toast.error(res.response.data.error);
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product?.reviews?.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              <img
                src={`${data.avatar?.url}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">
              {products ? products.length : "No products"}
            </h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000b0]">{averageRating}/5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
