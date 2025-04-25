import React, { useEffect } from 'react'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import { ROUTH_PATHS } from '../../Routers/Route_Paths'
import {Outlet,useLocation, useNavigate } from 'react-router-dom'

const Layout = () => {
  const loaction=useLocation();
  const navigate=useNavigate();

  useEffect(()=>{
    if(loaction.pathname ==="/"){
       navigate(ROUTH_PATHS.LANDING_PATH)}
  },[loaction.pathname,navigate]);

  return (
    <>
    <Header />
    <Outlet />
    <Footer />

    </>
  )
}

export default Layout