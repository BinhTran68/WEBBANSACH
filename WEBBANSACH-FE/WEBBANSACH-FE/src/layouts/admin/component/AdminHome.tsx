import React, {Component, useEffect, useState} from 'react';

// @ts-ignore
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import "../adminComponent.scss"

import {Routes, Route, Outlet, useNavigate, Link} from 'react-router-dom';
import RequireAdmin from '../RequireAdmin';
import {ROLE_USER_NHANVIEN_QUANLY_ADMIN} from '../../ultils/config';
import {IoMdClose, IoMdMenu} from "react-icons/io";
import {IoClose} from "react-icons/io5";
import {FaBell} from "react-icons/fa";


const AdminHome = () => {

    const [statusNav, setStatusNav] = useState(true);

    function openNav() {
        // @ts-ignore
        document.getElementById("mySidenav").style.width = "250px";
        // @ts-ignore
        document.getElementById("main").style.marginLeft = "250px";
    }

    function closeNav() {
        // @ts-ignore
        document.getElementById("mySidenav").style.width = "0";
        // @ts-ignore
        document.getElementById("main").style.marginLeft = "0";
    }

    useEffect(() => {
        if (statusNav) {
            openNav();
        } else {
            closeNav();
        }
    }, [statusNav])

    return (
        <>
            <div className={"container-fluid p-0"}>

                <div id="mySidenav" className="sidenav mt-5">

                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>

                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <div className={"d-flex align-items-center"}>
                            <Link className="navbar-brand" to={"/admin"}>FAHASHA ADMIN</Link>
                            <span className={"span-menu-admin mx-2"} onClick={() => setStatusNav(!statusNav)}>
                        <IoMdMenu size={26}/>
                    </span>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Quản Lý Sách
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to={"/admin/quan-ly-sach"}>Danh Sách
                                            Sách</Link></li>
                                        <li><Link className="dropdown-item" to={"/admin/add-sach"}>Thêm Sách Sách</Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Quản Nhà Xuất Bản
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to={"/admin/quan-ly-sach"}>Danh Sách
                                            Sách</Link></li>
                                        <li><Link className="dropdown-item" to={"/admin/add-sach"}>Thêm Sách Sách</Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Quản Lý Thể Loại
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to={"/admin/quan-ly-sach"}>Danh Sách
                                            Sách</Link></li>
                                        <li><Link className="dropdown-item" to={"/admin/add-sach"}>Thêm Sách Sách</Link>
                                        </li>
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

                            <div >
                                <FaBell size={25} />
                            </div>

                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>

                        </div>
                    </div>
                </nav>


            </div>
            <main id={"main"} className={"min-vh-100 px-2 p-0"}>

                <div className={"px-3"}>
                    <Outlet/>
                </div>

            </main>
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
                </ul>
                <p className="text-center text-muted">© 2022 Company, Inc</p>
            </footer>

        </>
    );

}


const AdminHomeAdmin_QuanLy_NhanVien = RequireAdmin(AdminHome, ROLE_USER_NHANVIEN_QUANLY_ADMIN);
export default AdminHomeAdmin_QuanLy_NhanVien;