import * as Yup from 'yup';
export const loginValidationSchema = Yup.object().shape({
  mobile: Yup.string()
    .test(
      "mobile-or-email",
      "Enter a valid mobile number or email address",
      (value) =>
        /^[0-9]{10}$/.test(value) || // Mobile number validation (10 digits)
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) // Email validation
    )
    .required("Mobile number or email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

  export const businessValidationSchema = Yup.object({
    mobile: Yup.string()
      .test(
        "mobile-or-email",
        "Enter a valid mobile number or email address",
        (value) =>
          /^[0-9]{10}$/.test(value) || // Mobile number validation (10 digits)
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) // Email validation
      )
      .required("Mobile number or email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });