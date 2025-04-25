import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { appApi } from "../../../api/config";
import { API_PATHS } from "../../../api/apiPaths";
import { Box, Button, CardMedia, Typography, Rating } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PaymentModal from "./modal";

const Product_List = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const subCategoryId = searchParams.get("subcategoryid");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const payload = {
          productFilters: [],
          filters: [
            { field: "overallRatings", value: 0, type: "ge" },
            { field: "subCategoryId", value: subCategoryId, type: "eq" },
          ],
          sorting: [{ column: "createdAt", order: "desc" }],
        };

        const response = await appApi.post(API_PATHS.GET_PRODUCTS_API, payload);
        setProducts(response.data.rows || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (subCategoryId) {
      fetchProducts();
    }
  }, [subCategoryId]);

  const handleClick = (productId) => {
    navigate(`/viewProductDetail?productId=${productId}`);
  };

  return (
    <Box p={3}>
      <Typography variant="body2" sx={{ fontSize: "22px", fontWeight: "bold" }}>
        Result
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Check each product page for other buying options.
      </Typography>
      {products.length === 0 ? (
        <Typography color="error">
          No products found for this subcategory.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={1}>
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                p: 3,
                borderRadius: "4px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
                maxWidth: "80%",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "180px", height: "180px", objectFit: "contain" }}
                image={
                  product.fileBaseUrl &&
                  product.productImages[0]?.productImagePath
                    ? `${product.fileBaseUrl}${product.productImages[0].productImagePath}`
                    : "no_image_placeholder.png"
                }
                alt={product.name || "Product"}
                onClick={() => handleClick(product.id)}
              />
              <Box sx={{ flex: 1, pl: 2 }}>
                <Typography
                  variant="p"
                  component="div"
                  onClick={() => handleClick(product.id)}
                  sx={{
                    fontSize: "17px",
                    fontFamily: "Inter",
                    "&:hover": { color: "#F08804" },
                    cursor: "pointer",
                  }}
                >
                  {product.name || "Unnamed Product"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#00718D",
                    cursor: "pointer",
                  }}
                >
                  <Rating
                    value={product.overallRatings || 0}
                    readOnly
                    precision={0.5}
                    sx={{ my: 1, color: "#DE7921" }}
                  />
                  <KeyboardArrowDownIcon />
                  <Typography variant="body2" sx={{ fontSize: "17px" }}>
                    {product.noOfRatings === 0
                      ? "No rating"
                      : `${product.noOfRatings} ratings`}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {product.bought || 0} peoples bought in past
                </Typography>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "20px", marginLeft: 1 }}
                  >
                    ₹
                    {product.discountedPrice
                      ? product.discountedPrice.toLocaleString()
                      : "N/A"}
                    <Typography
                      variant="span"
                      sx={{
                        marginLeft: 1,
                        color: "gray",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      M.R.P{" "}
                    </Typography>
                    <Typography
                      variant="span"
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                        fontSize: "14px",
                        marginLeft: 1,
                      }}
                    >
                      {product.actualPrice
                        ? product.actualPrice.toLocaleString()
                        : "N/A"}
                    </Typography>
                    <Typography variant="span">
                      {" "}
                      ({product.discount || 0}% <br /> off)
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="p"
                    sx={{
                      margin: "10px 0 0 0",
                      padding: "1px 8px",
                      fontSize: "14px",
                      backgroundColor: "#7FDA89",
                      borderRadius: "2px",
                    }}
                  >
                    Save ₹
                    {product.actualPrice - product.discountedPrice || 0}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{ fontSize: "14px", padding: "12px 0 0 6px" }}
                  >
                    with this offer
                  </Typography>
                </Box>
                {product.quantity < 5 && product.quantity > 0 && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ fontSize: "14px" }}
                  >
                    Only {product.quantity} left in stock
                  </Typography>
                )}
                {product.quantity === 0 ? (
                  <Button
                    variant="outlined"
                    sx={{
                      color: "black",
                      borderRadius: "20px",
                      fontSize: "13px",
                      marginTop: "10px",
                    }}
                  >
                    Out of Stock
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      color: "black",
                      borderRadius: "20px",
                      marginTop: "10px ",
                      fontSize: "13px",
                      backgroundColor: "#FFA41C",
                    }}
                    onClick={() => setOpenModal(true)}
                  >
                    Buy Now
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
     
      <PaymentModal open={openModal} handleClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default Product_List;
