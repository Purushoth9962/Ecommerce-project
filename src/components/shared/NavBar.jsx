import React, { useState, useEffect } from 'react';
import { appApi } from '../../api/config';
import { API_PATHS } from '../../api/apiPaths';
import { Box, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { ROUTH_PATHS } from '../../Routers/Route_Paths';

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  // const [error, setError] = useState(null);
  const Navigate=useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await appApi.get(API_PATHS.CATEGORIES_WITHSUB_API);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
        // setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);
  const handleCategoryClick = (categoryId) => {
    Navigate(`/subCategory?id=${categoryId}`); 
  };

  const handleSubCategoryClick = (subCategoryId) => {
    Navigate(`/products?subcategoryid=${subCategoryId}`);
  };

  return (
    <Box sx={{ backgroundColor: "#232F3E", color: "white", }}>
      <Tabs
      value={false}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          flexFlow: 1,
          "& .MuiTabs-indicator": { display: "none" },
          color: "white",
          fontFamily: "Rubik",
           overflowX: "hidden", 
        whiteSpace: "nowrap",
        }}
      >
        <Tab label="All Category" sx={{ color: "white", fontFamily:"PT Sans", minWidth: "auto",
          padding: "0 10px",}} onClick={()=>Navigate(ROUTH_PATHS.CATEGORY_PATH)} />
        {categories.map((category) => (
          <Tooltip
            key={category.id}
            title={
              <Box sx={{ p: 1 }}>
                {category.subCategories.map((sub) => (
                  <Typography
                    key={sub.id}
                    onClick={()=>handleSubCategoryClick(sub.id)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#FEBD69",
                      },
                      textAlign: "start",
                    }}
                  >
                    {sub.name}
                  </Typography>
                ))}
              </Box>
            }
            arrow
            slotProps={{
              tooltip: {
                sx: { bgcolor: "white", color: "black", boxShadow: 3 },
              },
              arrow: {
                sx: { color: "white" },
              },
            }}
          >
            <Tab label={category.name} sx={{ color: "white", fontFamily: "PT Sans" , textTransform:"none",
               "&:hover": { border: "2px solid white", borderRadius: "5px" }}}
            onClick={()=>handleCategoryClick(category.id)} />
          </Tooltip>
        ))}
      </Tabs>
    </Box>
  );
};

export default NavBar;
