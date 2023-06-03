export const totalPrice = (cartData) => {
  const price = cartData?.map((data) => data?.price * data?.quantity);
  return price?.reduce((a, b) => Number(a) + Number(b), [0]);
};

export const discount = (totalPrice) => {
  const discount = Math.floor((50 / 100) * totalPrice);

  return discount;
};

export const grandTotal = (totalPrice, discount, fee) => {
  return totalPrice - discount + fee;
};
