import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { appApi } from "../../../api/config";
import { API_PATHS } from "../../../api/apiPaths";
import {
  Typography,
  CardMedia,
  Box,
  Rating,
  Divider,
  List,
  ListItem,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

import {
  FreeDelivery,
  PayOnDelivery,
  TopBrands,
  Installation,
} from "../../../Constants/constants";

const ProductDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState(null);
  const [expanded, setExpanded] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await appApi.get(
         `${API_PATHS.PRODUCT_DETAILS_API}/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (!product) return <Typography>Loading...</Typography>;

  // Determine visible properties for General Details
  const visibleProperties = expanded
    ? product.propertyValues
    : product.propertyValues.slice(0, 4);

  return (
    <Box sx={{ padding: "7px 20px 20px", }}>
      <Typography
        variant="body1"
        component="span"
        onClick={() => navigate(-1)}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 2 ,fontSize:"12px",letterSpacing:"0.5px",color:"#565059","&:Hover":{textDecoration:"underline"}}}
      >
        <ArrowBackIosNewIcon  sx={{ mr: 1,fontSize:"10px", "&:Hover":{textDecoration:"underline"}}} />
       {` Back to results`}
      </Typography>

      <Grid2 container spacing={11} alignItems="flex-start">
        <Grid2
          size={1}
          sx={{
            width: "460px",
            height: "550px",
            alignContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image={product.productImages[0]?.productImagePath}
            alt={product.name}
            sx={{
              width: "80%",
              height: "80%",
              objectFit: "contain",
              border: "0.2px solid #E0E0E0",
            }}
          />
        </Grid2>
        <Grid2 size={5}>
          <Typography
            variant="p"
            component="div"
            sx={{
              fontSize: "19.5px",
              fontFamily: "Inter",
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
              fontFamily: "Inter",
            }}
          >
            <Typography
              sx={{ color: "black", fontSize: "14px", padding: "0 7px 0 0" }}
            >
              {product.overallRatings}
            </Typography>
            <Rating
              value={product.overallRatings || 0}
              readOnly
              precision={0.5}
              sx={{ my: 1, color: "#DE7921" }}
            ></Rating>
            <KeyboardArrowDownIcon sx={{ color: "black" }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: "15px",
                fontFamily: "Rubik",
                padding: "0 0 0 30px",
              }}
            >
              {product.noOfRatings === 0
                ? "No rating"
                : `${product.noOfRatings} Ratings | Search in this page`}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ fontFamily: "Rubik", color: "#565959" }}
          >
            {product.bought || 0} peoples bought in past
          </Typography>
          {/* price and discount */}
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              component="span"
              sx={{
                fontWeight: "380",
                fontFamily: "Rubik",
                fontSize: "25px",
                margin: "6px 10px 0 0",
                color: "red",
              }}
            >
              -{product.discount || 0} % <br />
            </Typography>

            <Typography
              variant="body2"
              component="span"
              sx={{
                fontSize: "28px",
                fontWeight: "400",
                fontFamily: "Inter",
              }}
            >
              <Typography
                component="span"
                sx={{ fontSize: "1rem", verticalAlign: "super" }}
              >
                ₹
              </Typography>
              {product.discountedPrice
                ? product.discountedPrice.toLocaleString()
                : "N/A"}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              component="span"
              sx={{
                textDecoration: "line-through",
                color: "#565959",
                fontFamily: "Rubik",
              }}
            >
              M.R.P{" "}
              {product.actualPrice
                ? product.actualPrice.toLocaleString()
                : "N/A"}
            </Typography>
          </Box>
          {/* <Divider></Divider> */}
          {/* images delivery */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "auto",
              height: "95px",
              justifyContent: "center",
              color: "#00718D",
            }}
          >
            {product.hasFreeDelivery > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={FreeDelivery}
                  alt="Free Delivery"
                  style={{ width: "35px", height: "35px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  Free <br /> Delivery
                </Typography>
              </Box>
            )}
            {product.hasCashOnDelivery > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={PayOnDelivery}
                  alt="Cash on Delivery"
                  style={{ width: "35px", height: "35px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  Pay on <br /> Delivery
                </Typography>
              </Box>
            )}
            {product.isTopBrand > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={TopBrands}
                  alt="Top Brand"
                  style={{ width: "35px", height: "35px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  Top <br /> Brand
                </Typography>
              </Box>
            )}
            {product.isInstallationAvailable > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={Installation}
                  alt="Installation Available"
                  style={{ width: "35px", height: "35px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  Installation <br /> Available
                </Typography>
              </Box>
            )}
          </Box>
          <Divider></Divider>

          {/* General detials */}

          <Box sx={{ margin: "20px 0 0 0" }}>
            <Typography variant="h6">General Details</Typography>
            <List>
              {visibleProperties.map((property) => (
                <ListItem key={property.id} sx={{padding:"5px"}}>
                  <Box sx={{ width: "170px" }}>
                    <Typography
                      component="span"
                      sx={{ fontWeight: "bold", width: "300px",fontSize:"14px",letterSpacing:"0.8px" }}
                    >
                      {property.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="span" sx={{fontSize:"14px",fontFamily:"Rubik"}}>
                      {property.value}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
            {product.propertyValues.length > 4 && (
              <Box sx={{ textAlign: "start" }}>
                <Typography
                  onClick={() => setExpanded(!expanded)}
                  variant="body2"
                  component="div"
                  sx={{ textTransform: "none", padding: "0 0 0 15px" }}
                >
                  {expanded ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#00718D",
                        }}
                      >
                        <KeyboardArrowUpIcon sx={{ fontSize: "19px" }} />

                        <Typography sx={{ fontSize: "13px" }}>
                          Show Less
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#00718D",
                        }}
                      >
                        <KeyboardArrowDownIcon sx={{ fontSize: "19px" }} />

                        <Typography sx={{ fontSize: "13px" }}>
                          {" "}
                          Show More
                        </Typography>
                      </Box>
                    </>
                  )}
                </Typography>
              </Box>
            )}
          </Box>
       
          {product.about && (
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontSize: "17px", padding: "0 0 8px 0" }}
              >
                About this Product
              </Typography>
              <Typography
                sx={{ fontSize: "14px", letterSpacing: "0.5px" }}
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: product.about.replace(
                    /<li>/g,
                    '<li style="margin-bottom: 8px; margin-left: 10px;">'
                  ),
                }}
              />
            </Box>
          )}
        </Grid2>
    
        <Grid2
          size={2}
          sx={{
            padding: "14px",
            border: "0.2px solid #E0E0E0",
            borderRadius: "5px",
            width:"16.5%"

          }}
        >
          <Box sx={{ display: "flex" }}>
            <PlaceOutlinedIcon
              sx={{ fontSize: "20px", verticalAlign: "super" }}
            />

            <Typography
              variant="caption"
              component="span"
              sx={{ marginLeft: "5px",color:"#00718D" }}
            >
              Deliver To Tester - Chennai <br />
              600042
            </Typography>
          </Box>

          <Typography
  color={product.quantity === 0 ? "error" :product.quantity <5 ? "error" : "success" }
  variant="body2"
  component="div"
  sx={{
    marginTop: "7px",
    fontWeight: "500",
    fontFamily: "Rubik",
  }}
>
  {product.quantity === 0
    ? "Out of stock"
    : product.quantity < 5
    ?` Only ${product.quantity} left in stock`
    : "In Stock"}
</Typography>
          <Box sx={{display:"flex",justifyContent:"space-between"}}>

<Box sx={{color:"#565959"}}>
  <Typography sx={{fontSize:"12px",padding:"3px"}}>Payment</Typography>
  <Typography sx={{fontSize:"12px" ,padding:"3px"}}> Ships from</Typography>
  <Typography sx={{fontSize:"12px",padding:"3px"}}> Sold by</Typography>
</Box>

<Box sx={{color:"#00718D",textAlign:"end"}}>
<Typography sx={{fontSize:"12px",padding:"3px"}}> Secure Transaction</Typography>
<Typography sx={{fontSize:"12px",padding:"3px"}}> Amazon</Typography>
          <Typography sx={{fontSize:"12px",padding:"3px"}}>  {product.sellerUser.seller.storeName}</Typography>
</Box>

          </Box>
          {product.quantity !== 0 ?  <Button variant="contained" fullWidth disableRipple disableElevation sx={{
             fontWeight: "400",
             color: "black",
             borderRadius: "20px",
             fontSize: "13px",
             textTransform: "none",
             backgroundColor: "#FFA41C",
             margin: "14px 0 0 0",
             border: "none",
          }}>Buy now</Button>:""}
         
        </Grid2>
      </Grid2>

      <Divider></Divider>
  
      {product.description && (
        <Box sx={{width: "40%", margin:"8px" }}>
          <Typography variant="h6">Product Specifications:</Typography>
          {product.description.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "400",
                  width: "65%",
                  backgroundColor: "#EBEBEB",
                  padding: "12px",
                  display: "block",
                  letterSpacing: "0.7px",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px",
                  letterSpacing: "0.7px",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductDetailsPage;