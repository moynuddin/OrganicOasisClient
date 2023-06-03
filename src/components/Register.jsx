import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import { registerSchema } from "../Schemas";
import { useRegisterMutation } from "../slices/userApiSlice";

import classes from "./Register.module.css";
import { setCredentials } from "../slices/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        const modifiedData = { ...values };
        delete modifiedData.confirmPassword;
        console.log(modifiedData);

        try {
          const result = await register(modifiedData).unwrap();
          dispatch(setCredentials({ ...result }));
          handleReset();
          navigate("/login");
          toast.success("Register successful!");
        } catch (error) {
          console.log("Error registering", error);
        }
      },
    });
  return (
    <div className={classes.regsiterWrapper}>
      <div className={classes.inputsContainer}>
        <form onSubmit={handleSubmit}>
          <div className={classes.input}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={classes.formControl}
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && touched.name ? (
              <p className={classes.error}>{errors.name}</p>
            ) : (
              ""
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={classes.formControl}
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
              type="password"
              className={classes.formControl}
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <p className={classes.error}>{errors.password}</p>
            ) : (
              ""
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="text"
              className={classes.formControl}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <p className={classes.error}>{errors.confirmPassword}</p>
            ) : (
              ""
            )}
          </div>
          <div className={classes.btnWrapper}>
            <button type="submit" className={classes.btn}>
              {isLoading ? <CircularProgress /> : "Register"}
            </button>
          </div>
          <p className={classes.footNode}>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
