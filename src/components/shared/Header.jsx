import React, { useState, useEffect } from "react";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import NavBar from "./NavBar";
import {
  AppBar,
  MenuItem,
  Typography,
  Tooltip,
  Box,
  Autocomplete,
} from "@mui/material";
import img from "../../assets/Logo.png";
import {
  Boxone,
  Boxtwo,
  FlageImg,
  Headerbar,
  Inputsearch,
  LangBox,
  LangStyle,
  Log,
  ProductList,
  SearchButton,
  ShowLang,
} from "../../styles/Header";
import { useNavigate } from "react-router-dom";
import { INDIA } from "../../Constants/constants";
import { appApi } from "../../api/config";
import { API_PATHS } from "../../api/apiPaths";
import { ROUTH_PATHS } from "../../Routers/Route_Paths";
import { getCookie, deleteCookie } from "../../utils/Cookies";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await appApi.get(API_PATHS.CATEGORIES_WITHSUB_API);
        const fetchedCategories =
          response.data?.categories || response.data || [];
        setCategories(fetchedCategories);

        const allSubCategories = fetchedCategories
          .map((cat) => cat.subCategories || [])
          .flat();
        setSubCategories(allSubCategories);
      } catch {
        console.error("data not found");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const userNameFromCookie = getCookie("userName");
    if (userNameFromCookie) {
      setUserName(userNameFromCookie);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    deleteCookie("userName");
    deleteCookie("userToken");
    setUserName("");
    setIsLoggedIn(false);
    navigate(ROUTH_PATHS.LANDING_PATH);
  };
  

  const handleSignIn = () => {
    navigate(ROUTH_PATHS.LOGIN_PATH);
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);

    setSearchTerm("");

    if (selectedValue === "" || selectedValue === "All") {
      const allSubCategories = categories
        .map((cat) => cat.subCategories || [])
        .flat();
      setSubCategories(allSubCategories);
    } else {
      const selectedCat = categories.find((cat) => cat.name === selectedValue);
      setSubCategories(selectedCat ? selectedCat.subCategories || [] : []);
    }
  };

  const handleSearch = () => {
    if (selectedCategory === "" || selectedCategory === "All") {
      if (searchTerm) {
        const selectedSubCategory = subCategories.find(
          (sub) => sub.name === searchTerm
        );
        if (selectedSubCategory) {
          navigate(`/products?subcategoryid=${selectedSubCategory.id}`);
        } else {
          console.error("Subcategory not found for the search term.");
        }
      } else {
        navigate("/products");
      }
    } else if (selectedCategory && !searchTerm) {
      const selectedCat = categories.find(
        (cat) => cat.name === selectedCategory
      );
      if (selectedCat) {
        navigate(`/subCategory?id=${selectedCat.id}`);
      } else {
        console.error("Category not found for the selected category.");
      }
    } else if (selectedCategory && searchTerm) {
      const selectedSubCategory = subCategories.find(
        (sub) => sub.name === searchTerm
      );
      if (selectedSubCategory) {
        navigate(`/products?subcategoryid=${selectedSubCategory.id}`);
      } else {
        console.error("Subcategory not found for the search term.");
      }
    }
  };

  const languages = [
    "English - EN",
    "தமிழ் - TA",
    "हिंदी - HI",
    "తెలుగు - TE",
    "ಕನ್ನಡ - KN",
    "മലയാളം - ML",
    "বাংলা - BN",
    "मराठी - MR",
  ];

  return (
    <>
      <AppBar sx={{ position: "static" }}>
        <Headerbar>
          <Log src={img} onClick={() => navigate("/")}></Log>
          <Boxone>
            <FmdGoodOutlinedIcon fontSize="medium" />
            <Box width={"105px"}>
              <Typography variant="caption" component="div">
                Deliver to Tester
              </Typography>
              <Typography variant="body2" component="div">
                Chennai 621201
              </Typography>
            </Box>
          </Boxone>

          <Boxtwo>
            <ProductList
              displayEmpty
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  <Box
                    sx={{
                      fontSize: "14px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {category.name}
                  </Box>
                </MenuItem>
              ))}
            </ProductList>
            <Autocomplete
              sx={{ width: "100%" }}
              value={searchTerm}
              onChange={(event, newValue) => setSearchTerm(newValue)}
              options={subCategories.map((sub) => sub.name)}
              renderInput={(params) => (
                <Inputsearch
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="Search Amazon.in"
                />
              )}
            />

            <SearchButton>
              <SearchIcon onClick={handleSearch}></SearchIcon>
            </SearchButton>
          </Boxtwo>

          <LangBox display={"flex"} alignItems={"center"} margin={"0 0 0 "}>
            <Tooltip
              title={
                <ShowLang>
                  {languages.map((lang, index) => (
                    <LangStyle key={index}>{lang}</LangStyle>
                  ))}
                </ShowLang>
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
              <Typography
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 1,
                  fontWeight: "500",
                  border: "2px solid transparent",
                  borderRadius: "5px",
                  "&:hover": { border: "2px solid white", borderRadius: "5px" },
                }}
              >
                <FlageImg src={INDIA} />
                EN
                <ArrowDropDownOutlinedIcon />
              </Typography>
            </Tooltip>
          </LangBox>

          <Box display={"flex"} alignItems={"center"}>
            <Tooltip
              title={
                isLoggedIn ? (
                  <Typography
                    onClick={handleSignOut}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#FEBD69",
                      },
                      textAlign: "center",
                    }}
                  >
                    SignOut
                  </Typography>
                ) : (
                  <Typography
                    onClick={handleSignIn}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#FEBD69",
                      },
                      textAlign: "center",
                    }}
                  >
                    SignIn
                  </Typography>
                )
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
              <Box
                display="flex"
                alignContent="end"
                width="140px"
                sx={{
                  cursor: "pointer",
                  borderRadius: "5px",
                  border: "2px solid transparent",
                  "&:hover": { border: "2px solid white" },
                }}
              >
                <Box sx={{ paddingLeft: "5px" }}>
                  <Typography variant="caption" color="white">
                    Hello {userName || "Guest"}
                  </Typography>
                  <Typography variant="body2" fontWeight="500" margin="">
                    Accounts & Lists
                  </Typography>
                </Box>
                <Box>
                  <ArrowDropDownOutlinedIcon
                    fontSize="medium"
                    sx={{ paddingTop: "18px" }}
                  />
                </Box>
              </Box>
            </Tooltip>
          </Box>
        </Headerbar>
      </AppBar>
      <NavBar />
    </>
  );
};

export default Header;
