    import { AppBar, Box, Button, Typography } from "@mui/material";
import { FooterBox, FooterItem, FooterTypo, TextHeader } from '../../styles/footer';
import { useState,useEffect } from "react";
import { getCookie } from "../../utils/Cookies";
import {  useNavigate } from "react-router-dom";
import { ROUTH_PATHS } from "../../Routers/Route_Paths";

const Footer = () => {
    const Navigate=useNavigate()
    const [isSignedIn,setIsSignedIn] = useState(false);
    useEffect(() => {
        const user = getCookie("userName");
        setIsSignedIn(!!user); // true if cookie exists
      }, []);
 const ScrollTop=()=>{
    window.scrollTo({top:0,behavior:'smooth'})
 }

    return (
        <>
        {!isSignedIn && (
  <Box sx={{display:"flex", alignItems:"center", flexDirection:"column", borderTop:"1px solid #C2BEBE", padding:"15px 0 0 5px"}}>
    <Typography sx={{fontFamily:"Rubik", fontSize:"12px", margin:"10px 0 0 0"}}> See personalized recommendations </Typography>
    <Button
      sx={{backgroundColor:"#FFC52F", color:"black", textTransform:"none", width:"15%", borderRadius:"5px", height:"4.5vh",  cursor:'pointer', margin:"5px"}}
      onClick={() => Navigate(ROUTH_PATHS.LOGIN_PATH)}
    >
      Sign In
    </Button>
    <Box sx={{display:"flex", gap:"5px"}}>
      <Typography sx={{fontSize:"12px"}}>New customer?</Typography>
      <Typography sx={{fontSize:"12px", color:"#0066C0", cursor:"pointer", margin:'0 0 10px 0'}} onClick={() => Navigate(ROUTH_PATHS.REGISTER_PATH)}>
        Start here.
      </Typography>
    </Box>
  </Box>
)}

            <AppBar sx={{backgroundColor: '#37475A', position: 'static' }}>
                    <Typography 
                        variant="body2" 
                        align= 'center' 
                        sx={{padding: '14px'}}
                        onClick={ScrollTop}
                    >Back To Top</Typography>
            </AppBar>
            <FooterBox container>
            
            <FooterItem >
                <TextHeader variant="h6">
                    Get to Know Us
                </TextHeader>
                <FooterTypo variant="body2">
                    About Us
                </FooterTypo>
                <FooterTypo variant="body2">
                    Careers
                </FooterTypo>
                <FooterTypo variant="body2">
                    Press Releases
                </FooterTypo>
                <FooterTypo variant="body2">
                    Amazon Science
                </FooterTypo>
            </FooterItem>
            <FooterItem >
                <TextHeader variant="h6">
                    Connect with Us
                </TextHeader>
                <FooterTypo variant="body2">
                    Facebook
                </FooterTypo>
                <FooterTypo variant="body2">
                    Twitter
                </FooterTypo>
                <FooterTypo variant="body2">
                    Instagram
                </FooterTypo>
            </FooterItem>
            <FooterItem >
                <TextHeader variant="h6">
                    Make Money with Us
                </TextHeader>
                <FooterTypo variant="body2">
                    Sell on Amazon
                </FooterTypo>
                <FooterTypo variant="body2">
                    Sell under Amazon Accelerator
                </FooterTypo>
                <FooterTypo variant="body2">
                    Protect and Build Your Brand
                </FooterTypo>
                <FooterTypo variant="body2">
                    Amazon Global Selling
                </FooterTypo>
                <FooterTypo variant="body2">
                    Supply to Amazon
                </FooterTypo>
                <FooterTypo variant="body2">
                    Become an Affiliate
                </FooterTypo>
                <FooterTypo variant="body2">
                    Fulfillment by Amazon
                </FooterTypo>
                <FooterTypo variant="body2">
                    Advertise Your Products
                </FooterTypo>
                <FooterTypo variant="body2">
                    Amazon Pay on Merchants
                </FooterTypo>
            </FooterItem>
            <FooterItem >
                <TextHeader variant="h6">
                    Let Us Help You
                </TextHeader>
                <FooterTypo variant="body2">
                    Your Account
                </FooterTypo>
                <FooterTypo variant="body2">
                    Returns Centre
                </FooterTypo>
                <FooterTypo variant="body2">
                    Recalls and Product Safety Alerts
                </FooterTypo>
                <FooterTypo variant="body2">
                    100% Purchase Protection
                </FooterTypo>
                <FooterTypo variant="body2">
                    Amazon App Download
                </FooterTypo>
                <FooterTypo variant="body2">
                    Help
                </FooterTypo>
            </FooterItem>


            </FooterBox>
        </>
    );
}

export default Footer;