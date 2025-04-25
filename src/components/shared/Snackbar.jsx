import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { hideSnackbar } from "../../Redux/slice/";

const SnackBar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.combined.snackbar
  );

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        "& .MuiSnackbar-root": {
          zIndex: 9999,
        },
        "& .MuiAlert-root": {
          minWidth: 300,
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "100%",
          zIndex: 9999,
          boxShadow: 3,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;