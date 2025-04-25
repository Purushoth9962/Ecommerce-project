import React, { useEffect, useState } from "react";
import { appApi } from "../../../api/config";
import { API_PATHS } from "../../../api/apiPaths";
import { CardMedia, Grid2, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTH_PATHS } from "../../../Routers/Route_Paths";


const Categories = () => {
  const Navigate=useNavigate()
  const [allcategory, setallcategory] = useState([]);
  useEffect(() => {
    const getcategory = async () => {
      try {
        const response = await appApi.get(API_PATHS.CATEGORIES_WITHSUB_API);
        setallcategory(response.data);
        console.log("frtched datra", response.data);
      } catch {
        console.log("error");
      }
    };
    getcategory();
  }, []);
  const handelClick=(id)=>{
    Navigate(`${ROUTH_PATHS.SUBCATEGORY_PATH}?id=${id}`)
  }
  return (
    <>
     
      <Typography variant="h6" sx={{ textAlign: "center", margin:"40px 0 40px 0" }}>shop by category</Typography>
      <Grid2 container spacing={3}>
        {allcategory.map((cat) => {
          return (
            <Grid2 key={cat.id}>
                
              <Card sx={{width:"200px", height:"180px"}}>
                <CardMedia sx={{width:"200px", height:"170px", objectFit:"contain",}}
                  component="img"
                  image={cat.categoryImagePath}
                  alt={cat.name}
                  onClick={()=>handelClick(cat.id)}
                ></CardMedia>
              </Card>
              <Typography variant="h6" fontSize='16px' textAlign='center'>{cat.name}</Typography>
            </Grid2>
          );
        })}
      </Grid2>
          
    </>
  );
};

export default Categories;
