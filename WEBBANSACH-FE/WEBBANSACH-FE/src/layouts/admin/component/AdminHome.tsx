import React, {Component} from 'react';

// @ts-ignore
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import "../adminComponent.scss"

import {Routes, Route, Outlet, useNavigate, Link} from 'react-router-dom';


const Home = () => {
    return <h1>Home</h1>;
};

const LineChart = () => {
    return <h1>Line Chart</h1>;
};

const BarChart = () => {
    return <h1>Bar Chart</h1>;
};

const AdminHome = () => {
    // Use the useNavigate hook to get the navigate function
    const navigate = useNavigate();

    return (
        // Wrap the SideNav and main with a Routes component
        <>
            <div className={"container-fluid"}>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={"/admin"}>FAHASHA ADMIN</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to={"/admin/quan-ly-sach"}  >Danh Sách Sách</Link></li>
                                        <li><Link className="dropdown-item" to={"/admin/add-sach"} >Thêm Sách Sách</Link></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#"
                                       aria-disabled="true">Disabled</a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <main className={"mx-5  "}>
                <Outlet/>
            </main>

        </>
    );

}

export default AdminHome;