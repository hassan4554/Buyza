import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import styles from "../../constants/styles";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { updateWishlist } from "../../redux/reducers/wishlist";
import { addToCart } from "../../redux/reducers/cart";
import { toast } from "react-toastify";
import { getAllProductsByShop } from "../../redux/reducers/product";
import { requestWrapper } from "../../utils/request_wrapper";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { data: products } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsByShop(data && data?.shopId._id));
    if (wishlist && wishlist.find((i) => i === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, dispatch, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const wishlistHandler = (id) => {
    setClick(!click);
    dispatch(updateWishlist(id));
  };

  const addToCartHandler = (id) => {
    if (data.stock < 1) {
      toast.error("Product out of stock!");
    } else {
      const cartData = { id, qty: 1 };
      dispatch(addToCart(cartData));
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product?.reviews?.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews?.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const res = await requestWrapper(
        `${server}/conversation/create`,
        {
          groupTitle,
          userId: user._id,
          shopId: data.shopId._id,
        },
        "POST",
        "application/json"
      );

      if (res.status !== 200) {
        toast.error(res.response.data.error);
        return;
      }
      navigate(`/inbox?${res.data.data._id}`);
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white">
      {data && (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                {/* Main Image */}
                <div className="w-full h-[400px] mb-4">
                  <img
                    src={`${data && data.images[select]?.url}`}
                    alt=""
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="w-full flex gap-2 overflow-x-auto">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          select === index
                            ? "border-blue-500 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => wishlistHandler(data._id)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => wishlistHandler(data._id)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shopId._id}`}>
                    <img
                      src={`${data?.shopId?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shopId._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shopId.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      ({averageRating}/5) Ratings Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
