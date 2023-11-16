import React, {Component} from 'react';
import Navbar from "../layouts/header-footer/Navbar";
import HeaderBaner from "../layouts/header-footer/HeaderBaner";
import Footer from "../layouts/header-footer/Footer";
import { Outlet } from "react-router-dom";
;

const UserLayout = ()   => {

        return (
            <div className={"container-fluid p-0"} >
                <HeaderBaner/>
                <Navbar/>
                <div>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        );

}

export default UserLayout;