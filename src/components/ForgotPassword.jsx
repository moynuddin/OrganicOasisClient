import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { forgotPassword } from "../Schemas";
import { toast } from "react-toastify";
import { useRecoverPasswordMutation } from "../slices/userApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [eye, setEye] = useState(true);
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation();

  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        email: "",
        newPassword: "",
      },
      validationSchema: forgotPassword,
      onSubmit: async (values) => {
        try {
          const { message } = await recoverPassword(values).unwrap();
          toast.success(message, { position: "top-center" });
          handleReset();
          navigate("/login");
        } catch (error) {
          console.error("Error", error);
          toast.error(error.data.message, { position: "top-center" });
        }
      },
    });

  const handleToggle = () => {
    setEye((prevState) => !prevState);
  };

  return (
    <div className={classes.forgotWrapper}>
      <div className={classes.inputsContainer}>
        <form onSubmit={handleSubmit}>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
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
            <label htmlFor="newPassword">New Password</label>
            <input
              type={eye ? "password" : "text"}
              className={
                errors.newPassword
                  ? classes.formControl + " " + classes.errorInput
                  : classes.formControl
              }
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
            />
            <div className={classes.eyeIcon} onClick={handleToggle}>
              <VisibilityIcon />
            </div>
            {errors.newPassword && touched.newPassword ? (
              <p className={classes.error}>{errors.newPassword}</p>
            ) : (
              ""
            )}
          </div>

          <div className={classes.btnWrapper}>
            <button type="submit" className={classes.btn}>
              {isLoading ? (
                <div className={classes.loaderWrapper}>
                  <p>Resetting...</p>
                  <CircularProgress
                    color="success"
                    className={classes.loader}
                  />
                </div>
              ) : (
                "Recover Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
