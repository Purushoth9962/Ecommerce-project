import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const GlobalLoading = () => {
  const isLoading = useSelector((state) => state.combined.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.1)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default GlobalLoading;