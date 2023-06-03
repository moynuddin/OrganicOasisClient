import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SearchIcon from "@mui/icons-material/Search";

import { useLogoutMutation } from "../slices/userApiSlice";
import { filter } from "../slices/productSlice";
import { logout } from "../slices/authSlice";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);
  const {
    data: { filteredValue },
  } = useSelector((state) => state.products);
  const [userLogout] = useLogoutMutation();

  const searchHandler = (e) => {
    dispatch(filter(e.target.value));
  };

  const handleLogout = async () => {
    await userLogout().unwrap();
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className={classes.navWrapper}>
      <Link to="/" className={classes.link}>
        <span className={classes.brand}>Organic Oasis</span>
      </Link>
      <div className={classes.searchbar}>
        <SearchIcon className={classes.searchIcon} />
        <input
          type="text"
          className={classes.searchInput}
          placeholder="Search organic veggies and fruits..."
          value={filteredValue}
          onChange={searchHandler}
        />
      </div>
      <div className={classes.navs}>
        <Link to="/cart" className={classes.link}>
          <div className={classes.cartWrapper}>
            {cartItems.length > 0 && <p>{cartItems.length}</p>}
            <ShoppingCartRoundedIcon />
          </div>
        </Link>
        {!userInfo && (
          <Link to="/login" className={classes.signin}>
            Sign in
          </Link>
        )}
        {userInfo && (
          <div className={classes.username} tabIndex="0">
            <AccountCircleRoundedIcon />
            <p>{userInfo.name}</p>
            <KeyboardArrowDownRoundedIcon />
            <div className={classes.dropdown}>
              <p className={classes.links}>
                <Link to="/profile">Profile</Link>
              </p>

              <p className={classes.links} onClick={handleLogout}>
                Logout
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
