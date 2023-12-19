import React, {Component, useEffect} from 'react';
import Navbar from "../layouts/header-footer/Navbar";
import HeaderBaner from "../layouts/header-footer/HeaderBaner";
import Footer from "../layouts/header-footer/Footer";
import {Outlet, useLocation} from "react-router-dom";
;

const UserLayout = ()   => {
    const  {pathname} = useLocation();

    useEffect(()=> {
        window.scrollTo(0,0);
    }, [pathname])

        return (
            <div className={"container-fluid p-0 bg-light"} >
                <HeaderBaner/>
                <Navbar/>
                <div className={"container p-0"}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        );

}

export default UserLayout;