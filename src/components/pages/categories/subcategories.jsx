import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { appApi } from "../../../api/config";
import { API_PATHS } from "../../../api/apiPaths";
import { Grid, Typography, CardMedia, Paper } from "@mui/material";

const Subcategories = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [subcategory, setSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryId = searchParams.get("id");

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await appApi.get(
          `${API_PATHS.CATEGORY_API}/${categoryId}`
        );
        const category = response.data;

        setSelectedCategory(category);
        setSubcategory(category.subCategories || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    if (categoryId) {
      fetchSubcategory();
    }
  }, [categoryId]); 

  const handleSubcategoryClick = (subcategoryId) => {
    navigate(`/products?subcategoryid=${subcategoryId}`);
  };

  return (
    <>
      {selectedCategory && (
        <Typography variant="h6" sx={{ textAlign: "center", padding: 3.4 }}>
          {selectedCategory.name}
        </Typography>
      )}

      <Grid container spacing={3.8} sx={{ padding: 3 }}>
        {subcategory.map((sub) => (
          <Grid item key={sub.id} sx={{ textAlign: "center" }}>
            <Paper
              sx={{
                cursor: "pointer",
                padding: 2,
                "&:hover": { boxShadow: 3 },
              }}
              onClick={() => handleSubcategoryClick(sub.id)}
            >
              <CardMedia
                component="img"
                src={
                  sub.product &&
                  sub.product.length > 0 &&
                  sub.product[0].productImages &&
                  sub.product[0].productImages.length > 0
                    ? sub.product[0].productImages[0].productImagePath
                    : "No Image Available"
                }
                alt={sub.name}
                sx={{ height: 140, objectFit: "contain" }}
              />
              <Typography sx={{ padding: 1 }}>{sub.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Subcategories;