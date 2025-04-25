import React, { useState } from 'react';
import {
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  CircularProgress,
  Alert,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Header,
  Lable,
  Lable1,
  Lable2,
  Lable3,
  LoginButton,
  MainPaper,
  RegButton,
} from '../../../styles/Register';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTH_PATHS } from '../../../Routers/Route_Paths';
import logo from '../../../assets/EcommerceLoginAsset.png';
import { useFormik } from 'formik';
import { registerValidationSchema } from '../../../Validition/formik_yup';
import { setCookie } from '../../../utils/Cookies';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobileNo: '',
      password: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://api-ecommerce-app.bluetickcoders.com/register',
          values
        );

        // Set user data in cookies
        setCookie('userName', response.data.name, { maxAge: 3600 }); // Expires in 1 hour
        setCookie('userToken', response.data.token, { maxAge: 3600 });

        setSnackBar({
          open: true,
          message: 'Registration successful! Redirecting to login...',
          severity: 'success',
        });

        setTimeout(() => {
          navigate(ROUTH_PATHS.LOGIN_PATH);
        }, 1000);
      } catch (error) {
        setSnackBar({
          open: true,
          message: error.response?.data?.error || 'Registration failed.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <img src={logo} alt="no image" margin="50px 0 0 0" />
        <MainPaper elevation={3} sx={{ padding: 3 }}>
          <Header variant="h5">Create Your Account</Header>

          <form onSubmit={formik.handleSubmit}>
            <Lable htmlFor="name">Name</Lable>
            <OutlinedInput
              id="name"
              fullWidth
              size="small"
              margin="normal"
              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            {formik.touched.name && formik.errors.name && (
              <Box color="error.main" fontSize="small">
                {formik.errors.name}
              </Box>
            )}

            <Lable1 htmlFor="mobileNo">Mobile Number</Lable1>
            <OutlinedInput
              id="mobileNo"
              fullWidth
              size="small"
              margin="normal"
              {...formik.getFieldProps('mobileNo')}
              error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
            />
            {formik.touched.mobileNo && formik.errors.mobileNo && (
              <Box color="error.main" fontSize="small">
                {formik.errors.mobileNo}
              </Box>
            )}

            <Lable2 htmlFor="email">Email</Lable2>
            <OutlinedInput
              id="email"
              fullWidth
              size="small"
              margin="normal"
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <Box color="error.main" fontSize="small">
                {formik.errors.email}
              </Box>
            )}

            <Lable3 htmlFor="password">Password</Lable3>
            <OutlinedInput
              id="password"
              fullWidth
              size="small"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
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

            <RegButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </RegButton>
          </form>
        </MainPaper>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '8px',
          }}
        >
          <Box sx={{ width: '62%' }}>
            <Divider>
              <Typography>Already Have An Account?</Typography>
            </Divider>
          </Box>
        </Box>
        <LoginButton
          variant="contained"
          fullWidth
          onClick={() => navigate(ROUTH_PATHS.LOGIN_PATH)}
        >
          Go To Login
        </LoginButton>
      </Container>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={() => setSnackBar({ ...snackBar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackBar({ ...snackBar, open: false })}
          severity={snackBar.severity}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
