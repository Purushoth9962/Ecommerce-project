import React from "react";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import {
  Button1,
  Header,
  Lable1,
  Lable2,
  LoginButton,
  MainPaper,
  Text2,
  Text3,
  TextBox,
} from "../../../styles/Business";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTH_PATHS } from "../../../Routers/Route_Paths";
import logo from "../../../assets/EcommerceLoginAsset.png";
import { useFormik } from "formik";
import { businessValidationSchema } from "../../../Validition/formik_yup";

const Business = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
    },
    validationSchema: businessValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://api-ecommerce-app.bluetickcoders.com/login",
          {
            mobileNo: values.mobile,
            password: values.password,
          }
        );
        console.log(response);
        navigate(ROUTH_PATHS.LANDING_PATH);
      } catch (error) {
        console.error("Data not found", error);
        setSnackbar({
          open: true,
          message: error.response?.data?.error || "Login failed.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "60px" }}>
        <img src={logo} alt="img not found" />
        <MainPaper elevation={2} sx={{ padding: 3 }}>
          <Header variant="h5">Sign in with business credentials</Header>

          <form onSubmit={formik.handleSubmit}>
            <Lable1 htmlFor="mobile">Email or Mobile Number</Lable1>
            <OutlinedInput
              id="mobile"
              fullWidth
              size="small"
              margin="normal"
              {...formik.getFieldProps("mobile")}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <Box color="error.main" fontSize="small">
                {formik.errors.mobile}
              </Box>
            )}

            <Lable2 htmlFor="password">Password</Lable2>
            <OutlinedInput
              id="password"
              fullWidth
              size="small"
              margin="normal"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.password && formik.errors.password && (
              <Box color="error.main" fontSize="small">
                {formik.errors.password}
              </Box>
            )}

            <Button1
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button1>
          </form>

          <TextBox>
            <Text2
              variant="h6"
              onClick={() => navigate(ROUTH_PATHS.LANDING_PATH)}
            >
              Back To Home
            </Text2>
          </TextBox>
        </MainPaper>
        <Box>
          <Text3>
            <Box sx={{ width: "55%" }}>
              <Divider>Login</Divider>
            </Box>
          </Text3>

          <LoginButton
            variant="contained"
            fullWidth
            onClick={() => navigate(ROUTH_PATHS.REGISTER_PATH)}
          >
            LOGIN AS AMAZON USER
          </LoginButton>
        </Box>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Business;