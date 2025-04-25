import { Box, IconButton, Select, styled, TextField, Toolbar, Typography, } from '@mui/material'

export const Headerbar = styled(Toolbar)({
  backgroundColor: "#131921",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

})
export const ProductList = styled(Select)(({theme})=>({
  [theme.breakpoints.down("md")]:{
    display:"none"
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ccc",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black !important",
  },
  backgroundColor: "#E6E6E6",
  maxWidth: "108px",
  height: "38px",
  borderRadius: "5px 0px 0px 5px",

}))
export const Inputsearch = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },

  backgroundColor: "white",
  width: "100%",
  height: "38px",
  borderRadius: "0px",

})
export const Log = styled("img")({

  cursor: "pointer"
})
export const SearchButton = styled(IconButton)({
  backgroundColor: "#FEBD69",
  textAlign: "center",
  borderRadius: "0px 5px 5px 0px",
  height: "38px",
  "&:hover": {
    backgroundColor: "#FCDD3D",
    height: "37px",
  },



})
export const ShowLang = styled(Box)({
  bgcolor: "white",
  padding: "0 0 0 10px",
    
})

export const LangStyle = styled(Typography)({
  padding: "5px",
  cursor: "pointer", "&:hover": { textDecoration: "underline", color: "#FEBD69" }
})

export const FlageImg = styled("img")({
  width: "20px",
  marginRight: "10px"

})
 export const Boxone=styled(Box)(({theme})=>({
  [theme.breakpoints.down("md")]:{
    display:"none"
  },
  display:"flex",
  alignItems:"center"
 }))

 export const Boxtwo =styled(Box)({
     display:"flex",
    alignItems:"center",
     maxWidth:"750px",
    flexGrow:1
 })
 export const LangBox =styled(Box)(({theme})=>({
  [theme.breakpoints.down("md")]:{
    display:"none"
  }
 }))
 export const signinBox =styled(Box)(({theme})=>({
   [theme.breakpoints.down("md")]:{
    display:"none"
   }
 }))
//  export const =styled(Box)({
  
//  })
//  export const =styled(Box)({
  
//  })
//  export const =styled(Box)({
  
//  })