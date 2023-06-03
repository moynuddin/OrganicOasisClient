import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";

import { loginSchema } from "../Schemas";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          const res = await login(values).unwrap();
          dispatch(setCredentials({ ...res }));

          handleReset();
          navigate("/");
          toast.success("Login successfull!", { position: "top-center" });
        } catch (error) {
          console.log("Error in login", error);
          toast.error(error.data.message, { position: "top-center" });
        }
      },
    });

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <div className={classes.loginWrapper}>
      <div className={classes.inputsContainer}>
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={
                errors.email
                  ? classes.formControl + " " + classes.errorInput
                  : classes.formControl
              }
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email ? (
              <p className={classes.error}>{errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor="password">Password</label>
            <input
              type={toggle ? "text" : "password"}
              className={
                errors.password
                  ? classes.formControl + " " + classes.errorInput
                  : classes.formControl
              }
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <div className={classes.eyeIcon} onClick={handleToggle}>
              <VisibilityIcon />
            </div>
            {errors.password && touched.password ? (
              <p className={classes.error}>{errors.password}</p>
            ) : (
              ""
            )}
            <p className={classes.forgotPassword}>
              <span>
                <Link to="/forgot-password"> Recover password </Link>
              </span>
            </p>
          </div>
          <div className={classes.btnWrapper}>
            <button type="submit" className={classes.btn}>
              {isLoading ? (
                <div className={classes.loginSuccess}>
                  <p>Loggin</p>
                  <CircularProgress
                    color="success"
                    className={classes.loader}
                  />
                </div>
              ) : (
                <div className={classes.loginBtn}>
                  <p>Login</p> <LockRoundedIcon />
                </div>
              )}
            </button>
          </div>
          <p className={classes.footNote}>
            Don&apos;t have any account?{" "}
            <span>
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
