import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import classes from "./FoodItem.module.css";
import { addToCart } from "../slices/cartSlice";
const FoodItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const Cartdata = useSelector((state) => state.cart);

  const addProductHandler = (product) => {
    if (userInfo === null) {
      return navigate("/login");
    }
    dispatch(addToCart(product));
  };

  const checkCartItems = () => {
    return Cartdata.some((data) => data._id === product._id);
  };
  return (
    <>
      <div className={classes.foodWrapper}>
        <img
          src={product?.image?.url}
          alt={product.name}
          className={classes.img}
        />
        <div className={classes.content}>
          <div>
            <p>{product.name}</p>
            <p>&#8377; {product.price}</p>
          </div>
          <div onClick={() => addProductHandler(product)}>
            {checkCartItems() ? (
              <Link to="/cart" className={classes.gotobag}>
                <div>
                  Go to cart
                  <ShoppingBagIcon />
                </div>
              </Link>
            ) : (
              <AddCircleRoundedIcon
                fontSize="large"
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
        <p className={classes.desc}>{product.desc}</p>
      </div>
    </>
  );
};

export default FoodItem;
