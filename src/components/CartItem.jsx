import { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { priceList, removeFromCart } from "../slices/cartSlice";
import classes from "./CartItem.module.css";

const CartItem = ({ cartItems }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantity = (id, e) => {
    const newQty = e.target.value;
    setQty(e.target.value);
    dispatch(priceList({ id, newQty }));
  };

  return (
    <>
      <div className={classes.cartWrapper}>
        <img
          src={cartItems?.image?.url}
          alt={cartItems.name}
          className={classes.img}
        />
        <div className={classes.details}>
          <div className={classes.prices}>
            <p className={classes.price}>&#8377; {cartItems.price * qty}</p>
            <p className={classes.fakePrice}>$150</p>
            <p className={classes.discount}>
              {" "}
              {Math.floor(Math.random() * 100)}% OFF
            </p>
          </div>
          <p className={classes.name}>{cartItems.name}</p>
          <p className={classes.qantity}>
            {" "}
            {qty} x {cartItems.quantity}kg
          </p>
          <p className={classes.desc}>{cartItems.desc}</p>
          <select
            className={classes.qtySelector}
            onChange={() => handleQuantity(cartItems._id, event)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={classes.deleteIcon}>
          <DeleteRoundedIcon onClick={() => removeItemHandler(cartItems._id)} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
