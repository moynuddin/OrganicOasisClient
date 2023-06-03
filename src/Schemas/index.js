import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Enter your email!"),
  password: Yup.string().required("Enter your password"),
});

export const registerSchema = Yup.object({
  name: Yup.string().required("Enter your name!"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
  password: Yup.string().required("Enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
});

export const updateProfile = Yup.object({
  name: Yup.string().required("Enter your name!"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
  password: Yup.string().required("Enter your password!"),
});

export const forgotPassword = Yup.object({
  email: Yup.string().email("Invalid email!").required("Enter your email!"),
  newPassword: Yup.string().required("Enter password"),
});
