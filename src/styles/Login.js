import { Box, Button, Divider, InputLabel, Link, Paper, styled, Typography } from "@mui/material";

export const  MainPaper=styled(Box)({
    textAlign:"start",
    height:"300px",
    width:"300px",
     margin:"0 0 0 96px",
    border:"0.5px solid #D5D9D9",
    borderRadius:"5px"
})
export const Header=styled(Typography)({
    padding:"0 0 5px 0"
})
export const Lable1= styled(InputLabel)({
    color:"black",margin:"10px 0 0 0"
})
export const Lable2= styled(InputLabel)({
    color:"black",margin:"10px 0 0 0"
})
export const Button1= styled(Button)({
    backgroundColor:"#FCDD3D",
    color:"black",
    margin:"15px 0 0 0", 
    borderRadius:"15px"
})
export const  TextBox=styled(Box)({
   textAlign:'center',margin:"10px 0 20px 0"
})
export const Text1=styled(Typography)({
fontSize:"13px",color:"#0066C0",
cursor:"pointer"
})
export const Text2=styled(Link)({
     fontSize:"12px",color:"#0066C0",
    textDecoration:"none",
    cursor:"pointer"

})
export const Text3=styled(Box)({
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    // fontSize:"medium", 
    marginTop:"20px"
    
})
export const LoginButton =styled(Button)({
    backgroundColor:"#F5F5F5",
    color:"black",
    margin:"20px 0 0 0",
    width:"320px"
})