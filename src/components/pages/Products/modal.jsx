// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   TextField,
//   IconButton,
//   Button,
// } from "@mui/material";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const PaymentModal = ({ open, handleClose }) => {
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [successOpen, setSuccessOpen] = useState(false);
//   const navigate = useNavigate();

//   const validationSchemas = {
//     card: Yup.object({
//       cardNumber: Yup.string()
//         .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
//         .required("Card number is required"),
//       cardholderName: Yup.string().required("Cardholder name is required"),
//       expiryDate: Yup.string()
//         .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date format (MM/YY)")
//         .required("Expiry date is required"),
//       cvv: Yup.string()
//         .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
//         .required("CVV is required"),
//     }),
//     upi: Yup.object({
//       upiId: Yup.string()
//         .matches(/^[\w.-]+@[\w]+$/, "Invalid UPI ID")
//         .required("UPI ID is required"),
//     }),
//   };

//   const formik = useFormik({
//     initialValues: {
//       cardNumber: "",
//       cardholderName: "",
//       expiryDate: "",
//       cvv: "",
//       upiId: "",
//     },
//     enableReinitialize: true,
//     validationSchema: selectedMethod ? validationSchemas[selectedMethod] : null,
//     onSubmit: () => {
//       handleClose();
//       setSuccessOpen(true);
//     },
//   });

//   const handleMethodChange = (event) => {
//     setSelectedMethod(event.target.value);
//     formik.resetForm(); // Reset form when method changes
//   };

//   const continueShopping = () => {
//     setSuccessOpen(false);
//     navigate("/");
//   };

//   return (
//     <>
//       {/* Payment Modal */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         slotProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
//       >
//         <Box sx={modalStyle1}>
//           <Typography variant="h6" fontWeight="bold" mb={2}>
//             Select Payment Method
//           </Typography>

//           {/* Radio Buttons */}
//           <RadioGroup value={selectedMethod} onChange={handleMethodChange}>
//             <FormControlLabel value="card" control={<Radio />} label="Debit Card or Credit Card" />
//             <FormControlLabel value="upi" control={<Radio />} label="UPI" />
//             <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
//           </RadioGroup>

//           {/* Formik Form */}
//           <form onSubmit={formik.handleSubmit}>
//             <Box mt={2} >
//               {selectedMethod === "card" && (
//                 <>
//                   <TextField
//                     fullWidth
//                     margin="dense"
//                     label="Card Number"
//                     name="cardNumber"
//                     value={formik.values.cardNumber}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
//                     helperText={formik.touched.cardNumber && formik.errors.cardNumber}
//                   />
//                   <TextField
//                     fullWidth
//                     margin="dense"
//                     label="Cardholder Name"
//                     name="cardholderName"
//                     value={formik.values.cardholderName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.cardholderName && Boolean(formik.errors.cardholderName)}
//                     helperText={formik.touched.cardholderName && formik.errors.cardholderName}
//                   />
//                   <TextField
//                     fullWidth
//                     margin="dense"
//                     label="Expiry Date (MM/YY)"
//                     name="expiryDate"
//                     value={formik.values.expiryDate}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
//                     helperText={formik.touched.expiryDate && formik.errors.expiryDate}
//                   />
//                   <TextField
//                     fullWidth
//                     margin="dense"
//                     label="CVV"
//                     name="cvv"
//                     type="password"
//                     value={formik.values.cvv}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.cvv && Boolean(formik.errors.cvv)}
//                     helperText={formik.touched.cvv && formik.errors.cvv}
//                     InputProps={{
//                       endAdornment: (
//                         <IconButton>
//                           <VisibilityOffIcon />
//                         </IconButton>
//                       ),
//                     }}
//                   />
//                 </>
//               )}

//               {selectedMethod === "upi" && (
//                 <TextField
//                   fullWidth
//                   margin="dense"
//                   label="UPI ID"
//                   name="upiId"
//                   value={formik.values.upiId}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.upiId && Boolean(formik.errors.upiId)}
//                   helperText={formik.touched.upiId && formik.errors.upiId}
//                 />
//               )}
//             </Box>

//             {/* Proceed Button */}
//             <Button
//               fullWidth
//               variant="contained"
//               type="submit"
//               sx={{
//                 mt: 2,
//                 fontWeight: "300",
//                 color: "black",
//                 borderRadius: "20px",
//                 backgroundColor: "#FFA41C",
//                 border: "none",
//               }}
//               disabled={!selectedMethod}
//             >
//               Proceed to Buy
//             </Button>
//           </form>
//         </Box>
//       </Modal>

//       {/* Success Modal */}
//       <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
//         <Box sx={modalStyle2}>
//           <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
//           <Typography variant="h5" fontWeight="bold" mt={2}>
//             Payment Successful!
//           </Typography>
//           <Typography variant="body1" color="textSecondary" mt={1}>
//             Your payment has been processed successfully.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ mt: 3, backgroundColor: "black", color: "white" }}
//             onClick={continueShopping}
//           >
//             CONTINUE TO SHOPPING
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// // Modal Styling
// const modalStyle1 = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 320,
//   bgcolor: "background.paper",
//   p: 3,
//   borderRadius: 2,
//   outline: "none",
//   textAlign: "center",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",

// };

// const modalStyle2 = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 420,
//   bgcolor: "background.paper",
//   p: 3,
//   borderRadius: 2,
//   outline: "none",
//   textAlign: "center",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
// };

// export default PaymentModal;



// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   TextField,
//   IconButton,
//   Button,
// } from "@mui/material";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const PaymentModal = ({ open, handleClose }) => {
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [successOpen, setSuccessOpen] = useState(false);
//   const [modalPosition, setModalPosition] = useState({
//     top: "10%",
//     transform: "translate(-50%, 0)",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (open) {
//       setTimeout(() => {
//         setModalPosition({ top: "50%", transform: "translate(-50%, -50%)" });
//       }, 100); // Delay to trigger the transition
//     } else {
//       setModalPosition({ top: "10%", transform: "translate(-50%, 0)" });
//     }
//   }, [open]);

//   const validationSchemas = {
//     card: Yup.object({
//       cardNumber: Yup.string()
//         .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
//         .required("Card number is required"),
//       cardholderName: Yup.string().required("Cardholder name is required"),
//       expiryDate: Yup.string()
//         .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date format (MM/YY)")
//         .required("Expiry date is required"),
//       cvv: Yup.string()
//         .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
//         .required("CVV is required"),
//     }),
//     upi: Yup.object({
//       upiId: Yup.string()
//         .matches(/^[\w.-]+@[\w]+$/, "Invalid UPI ID")
//         .required("UPI ID is required"),
//     }),
//   };

//   const formik = useFormik({
//     initialValues: {
//       cardNumber: "",
//       cardholderName: "",
//       expiryDate: "",
//       cvv: "",
//       upiId: "",
//     },
//     enableReinitialize: true,
//     validationSchema: selectedMethod ? validationSchemas[selectedMethod] : null,
//     onSubmit: () => {
//       handleClose();
//       setSuccessOpen(true);
//     },
//   });

//   const handleMethodChange = (event) => {
//     setSelectedMethod(event.target.value);
//     formik.resetForm(); // Reset form when method changes
//   };

//   const continueShopping = () => {
//     setSuccessOpen(false);
//     navigate("/");
//   };

//   return (
//     <>
//       {/* Payment Modal */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         slotProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
//       >
//         <Box sx={{ ...modalStyle1, ...modalPosition }}>
//           <Typography variant="h6" fontWeight="bold" mb={2}>
//             Select Payment Method
//           </Typography>

//           {/* Radio Buttons */}
//           <RadioGroup value={selectedMethod} onChange={handleMethodChange}>
//             <FormControlLabel value="card" control={<Radio />} label="Debit Card or Credit Card" />
//             <FormControlLabel value="upi" control={<Radio />} label="UPI" />
//             <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
//           </RadioGroup>

//           {/* Formik Form */}
//           <form onSubmit={formik.handleSubmit}>
//             <Box mt={2}>
//               {selectedMethod === "card" && (
//                 <>
//                   <TextField
//                     fullWidth
//                     margin="dense"
//                     label="Card Number"
//                     name="cardNumber"
//                     value={formik.values.cardNumber}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
//                     helperText={formik.touched.cardNumber && formik.errors.cardNumber}
//                   />
//                   <TextField
//                     fullWidth
//                     margin="dense"
//                     label="Cardholder Name"
//                     name="cardholderName"
//                     value={formik.values.cardholderName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.cardholderName && Boolean(formik.errors.cardholderName)}
//                     helperText={formik.touched.cardholderName && formik.errors.cardholderName}
//                   />
//                   <TextField
//                     fullWidth
//                     margin="dense"
//                     label="Expiry Date (MM/YY)"
//                     name="expiryDate"
//                     value={formik.values.expiryDate}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
//                     helperText={formik.touched.expiryDate && formik.errors.expiryDate}
//                   />
//                   <TextField
//                     fullWidth
//                     margin="dense"
//                     label="CVV"
//                     name="cvv"
//                     type="password"
//                     value={formik.values.cvv}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.cvv && Boolean(formik.errors.cvv)}
//                     helperText={formik.touched.cvv && formik.errors.cvv}
//                     InputProps={{
//                       endAdornment: (
//                         <IconButton>
//                           <VisibilityOffIcon />
//                         </IconButton>
//                       ),
//                     }}
//                   />
//                 </>
//               )}

//               {selectedMethod === "upi" && (
//                 <TextField
//                   fullWidth
//                   margin="dense"
//                   label="UPI ID"
//                   name="upiId"
//                   value={formik.values.upiId}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.upiId && Boolean(formik.errors.upiId)}
//                   helperText={formik.touched.upiId && formik.errors.upiId}
//                 />
//               )}
//             </Box>

//             {/* Proceed Button */}
//             <Button
//               fullWidth
//               variant="contained"
//               type="submit"
//               sx={{
//                 mt: 2,
//                 fontWeight: "300",
//                 color: "black",
//                 borderRadius: "20px",
//                 backgroundColor: "#FFA41C",
//                 border: "none",
//               }}
//               disabled={!selectedMethod}
//             >
//               Proceed to Buy
//             </Button>
//           </form>
//         </Box>
//       </Modal>

//       {/* Success Modal */}
//       <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
//         <Box sx={modalStyle2}>
//           <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
//           <Typography variant="h5" fontWeight="bold" mt={2}>
//             Payment Successful!
//           </Typography>
//           <Typography variant="body1" color="textSecondary" mt={1}>
//             Your payment has been processed successfully.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ mt: 3, backgroundColor: "black", color: "white" }}
//             onClick={continueShopping}
//           >
//             CONTINUE TO SHOPPING
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// // Modal Styling
// const modalStyle1 = {
//   position: "absolute",
//   left: "50%",
//   width: 320,
//   bgcolor: "background.paper",
//   p: 3,
//   borderRadius: 2,
//   outline: "none",
//   textAlign: "center",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
// };

// const modalStyle2 = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 420,
//   bgcolor: "background.paper",
//   p: 3,
//   borderRadius: 2,
//   outline: "none",
//   textAlign: "center",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
// };

// export default PaymentModal;


import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const PaymentModal = ({ open, handleClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({
    top: "10%",
    transform: "translate(-50%, 0)",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setModalPosition({ top: "50%", transform: "translate(-50%, -50%)" });
      }, 100); // Delay to trigger the transition
    } else {
      setModalPosition({ top: "10%", transform: "translate(-50%, 0)" });
    }
  }, [open]);

  const validationSchemas = {
    card: Yup.object({
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      cardholderName: Yup.string().required("Cardholder name is required"),
      expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date format (MM/YY)")
        .required("Expiry date is required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    }),
    upi: Yup.object({
      upiId: Yup.string()
        .matches(/^[\w.-]+@[\w]+$/, "Invalid UPI ID")
        .required("UPI ID is required"),
    }),
  };

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      upiId: "",
    },
    enableReinitialize: true,
    validationSchema: selectedMethod ? validationSchemas[selectedMethod] : null,
    onSubmit: () => {
      handleClose();
      setSuccessOpen(true);
    },
  });

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
    formik.resetForm(); // Reset form when method changes
  };

  const continueShopping = () => {
    setSuccessOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Payment Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
      >
        <Box sx={{ ...modalStyle1, ...modalPosition }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Select Payment Method
          </Typography>

          {/* Radio Buttons */}
          <RadioGroup value={selectedMethod} onChange={handleMethodChange}>
            <FormControlLabel value="card" control={<Radio />} label="Debit Card or Credit Card" />
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
            <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
          </RadioGroup>

          {/* Formik Form */}
          <form onSubmit={formik.handleSubmit}>
            <Box mt={2}>
              {selectedMethod === "card" && (
                <Box
                  sx={{
                    maxHeight: "200px", // Limit the height of the card section
                    overflowY: "auto", // Enable vertical scrolling
                    paddingRight: "8px", // Add padding for better UX
                  }}
                >
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Card Number"
                    name="cardNumber"
                    value={formik.values.cardNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                    helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Cardholder Name"
                    name="cardholderName"
                    value={formik.values.cardholderName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cardholderName && Boolean(formik.errors.cardholderName)}
                    helperText={formik.touched.cardholderName && formik.errors.cardholderName}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Expiry Date (MM/YY)"
                    name="expiryDate"
                    value={formik.values.expiryDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                    helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    label="CVV"
                    name="cvv"
                    type="password"
                    value={formik.values.cvv}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                    helperText={formik.touched.cvv && formik.errors.cvv}
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <VisibilityOffIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
              )}

              {selectedMethod === "upi" && (
                <TextField
                  fullWidth
                  margin="dense"
                  label="UPI ID"
                  name="upiId"
                  value={formik.values.upiId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.upiId && Boolean(formik.errors.upiId)}
                  helperText={formik.touched.upiId && formik.errors.upiId}
                />
              )}
            </Box>

            {/* Proceed Button */}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                fontWeight: "300",
                color: "black",
                borderRadius: "20px",
                backgroundColor: "#FFA41C",
                border: "none",
              }}
              disabled={!selectedMethod}
            >
              Proceed to Buy
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Success Modal */}
      <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
        <Box sx={modalStyle2}>
          <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
          <Typography variant="h5" fontWeight="bold" mt={2}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="textSecondary" mt={1}>
            Your payment has been processed successfully.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: "black", color: "white" }}
            onClick={continueShopping}
          >
            CONTINUE TO SHOPPING
          </Button>
        </Box>
      </Modal>
    </>
  );
};

// Modal Styling
const modalStyle1 = {
  position: "absolute",
  left: "50%",
  width: 320,
  bgcolor: "background.paper",
  p: 3,
  borderRadius: 2,
  outline: "none",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const modalStyle2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  p: 3,
  borderRadius: 2,
  outline: "none",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default PaymentModal;