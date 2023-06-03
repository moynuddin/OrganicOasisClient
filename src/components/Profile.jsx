import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { updateProfile as profile } from "../Schemas";
import classes from "./Profile.module.css";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        name: userInfo?.name ? userInfo?.name : "",
        email: userInfo?.email ? userInfo?.email : "",
        password: "",
      },
      validationSchema: profile,
      onSubmit: async (values) => {
        try {
          const res = await updateProfile(values).unwrap();

          if (res.ok) {
            console.log("here", res);
          }
          handleReset("password");
        } catch (error) {
          toast.error("Something went wrong", { theme: "dark" });
        }
      },
    });
  return (
    <div className={classes.profileWrapper}>
      <h1>Profile Update</h1>
      <div className={classes.inputsContainer}>
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.input}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className={classes.formControl}
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && touched.name && (
              <p className={classes.error}>{errors.name}</p>
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className={classes.formControl}
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <p className={classes.error}>{errors.email}</p>
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              className={classes.formControl}
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password && (
              <p className={classes.error}>{errors.password}</p>
            )}
          </div>
          <div className={classes.btnWrapper}>
            <button type="submit" className={classes.btn}>
              {isLoading ? "Loading" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
