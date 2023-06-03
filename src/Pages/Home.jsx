import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsMutation } from "../slices/productApiSlice";
import {
  getItems,
  recommended,
  lowToHigh,
  hightoLow,
} from "../slices/productSlice";

import classes from "./Home.module.css";
import FoodItem from "../components/FoodItem";
const Home = () => {
  const dispatch = useDispatch();
  const { data: products, filteredValue } = useSelector(
    (state) => state.products
  );
  const [getProducts, { isLoading }] = useGetProductsMutation();

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await getProducts().unwrap();
      dispatch(getItems(result));
    };
    getAllProducts();
  }, [getProducts, dispatch]);

  const handleSort = (e) => {
    let sortType = e.target.value;
    if (sortType === "recommended") {
      dispatch(recommended());
    } else if (sortType === "lowToHigh") {
      dispatch(lowToHigh());
    } else {
      dispatch(hightoLow());
    }
  };

  const handleFilter = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className={classes.selector}>
        <div className={classes.filter}>
          <select className={classes.selectOptions} onChange={handleFilter}>
            <option value="filter">FilterBy: All</option>
            <option value="veg">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>
        <div className={classes.sorting}>
          <select className={classes.selectOptions} onChange={handleSort}>
            <option value="recommended">SortBy: Recommended</option>
            <option value="lowToHigh">Price low to high</option>
            <option value="highToLow">Price high to low</option>
          </select>
        </div>
      </div>
      <div className={classes.homeWrapper}>
        {isLoading && <p>Loading</p>}

        {products?.length === 0 && <p>No product found!</p>}
        {products
          ?.filter((product) => {
            return filteredValue.toLowerCase() === ""
              ? product
              : product.name.toLowerCase().includes(filteredValue);
          })
          .map((product) => (
            <FoodItem key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Home;
