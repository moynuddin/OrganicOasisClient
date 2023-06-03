import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import {
  useCheckoutMutation,
  useGetapikeyMutation,
} from "../slices/paymentSlice";
import { totalPrice, discount, grandTotal } from "../utility/misc";

import EmptyCart from "../assets/images/emptyCart.jpg";
import classes from "./Cart.module.css";
const Cart = () => {
  const cartData = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [checkout] = useCheckoutMutation();
  const [getapiKey] = useGetapikeyMutation();
  const handlePayment = async () => {
    const totalAmount = grandTotal(
      totalPrice(cartData),
      discount(totalPrice(cartData)),
      10
    );
    const { key } = await getapiKey().unwrap();
    const { order } = await checkout({ amount: totalAmount }).unwrap();
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: userInfo.name,
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: "http://localhost:3000/api/paymentverification",
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: "9000090000",
      },
      notes: {
        address: "Moinuddin Mahmood Inc.",
      },
      theme: {
        color: "#000000",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <>
      <h1 className={classes.title}>
        {cartData.length !== 0 ? "Items in Cart" : ""}
      </h1>
      <div className={classes.cartContainer}>
        {cartData.length < 1 && (
          <div className={classes.emptyCart}>
            <img src={EmptyCart} alt="Empty cart" className={classes.img} />
            <div>
              <Link to="/">
                <button className={classes.btn}>Go to home</button>
              </Link>
            </div>
          </div>
        )}

        {cartData?.length !== 0 && (
          <div className={classes.container}>
            {cartData.map((data) => (
              <CartItem key={data?._id} cartItems={data} />
            ))}
          </div>
        )}
        {cartData?.length > 0 && (
          <div className={classes.payments}>
            <div className={classes.priceSummary}>
              <h5>Price Details ({cartData.length}items)</h5>
              <div className={classes.totalPrice}>
                <p>Total MRP</p>
                <p>${totalPrice(cartData)}</p>
              </div>
              <div className={classes.discount}>
                <p>Discount on MRP</p>
                <p>-${discount(totalPrice(cartData))}</p>
              </div>
              <div className={classes.totalPrice}>
                <p>Convenienc Fee</p>
                <p>$10</p>
              </div>
              <hr />
              <div className={classes.grandTotal}>
                <p>Total Amount</p>
                <p>
                  $
                  {grandTotal(
                    totalPrice(cartData),
                    discount(totalPrice(cartData)),
                    10
                  )}
                </p>
              </div>
              <div className={classes.payBtn}>
                <button onClick={handlePayment}>Place Order</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
