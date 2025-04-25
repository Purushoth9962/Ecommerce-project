import React, { useEffect, useState } from "react";
import { appApi } from "../../api/config";
import { API_PATHS } from "../../api/apiPaths";
import { Banner, GridBox1 } from "../../styles/landing";
import { Box, CardMedia, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [banner, setbanner] = useState("");
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchbanar = async () => {
      try {
        const bannerimg = await appApi.get(API_PATHS.BANNER_IMAGES);
        const bannerpath = bannerimg.data[0].bannerImagePath;
        setbanner(bannerpath);
      } catch (error) {
        console.log(error);
      }
    };
    fetchbanar();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await appApi.get(API_PATHS.LANDING_API);
        const ProductList = response.data;
        setproducts(ProductList);
      } catch {
        console.log("data not found");
      }
    };
    fetchProduct();
  }, []);

  const handleProductClick = (subCategoryId) => {
    navigate(`/products?subcategoryid=${subCategoryId}`);
  };

  return (
    <>
      <Banner src={banner} alt="no banner img" />
      <Box sx={{backgroundColor:"#EAEDED", paddingBottom:"40px"}}>
        <GridBox1 container spacing={3.3}>
          {products.map((sub) => {
            let productImage = sub.product[0].productImages[0].productImagePath;
            let BaseUrl = sub.product[0].fileBaseUrl;
            return (
              <Grid2 item key={sub.id}>
                <Box
                  sx={{
                    borderRadius: "2px",
                    textAlign: "center",
                    backgroundColor: "white",
                    transition: "0.3s",
                    height: "25vh",
                    "&:hover": {
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => handleProductClick(sub.id)} // Navigate to product list
                >
                  <Typography variant="h6" fontSize="16px" fontWeight="bold">
                    {sub.name}
                  </Typography>

                  <CardMedia
                    sx={{
                      width: "334px",
                      height: "130px",
                      objectFit: "contain",
                    }}
                    component="img"
                    image={`${BaseUrl}${productImage}`}
                    alt={sub.name}
                  />
                </Box>
              </Grid2>
            );
          })}
        </GridBox1>
      </Box>
    </>
  );
};

export default Landing;