import React, {Component} from 'react';

// @ts-ignore
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BsBook } from "react-icons/bs";
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
        <div>
            <div className={""}>
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
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
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
                <SideNav className={"position-fixed mt-5"}
                         onSelect={(selected: any) => {
                             // Call the navigate function with the corresponding path
                             const to = '/' + selected
                             navigate(to);  // khi chọn thì truyền đến
                         }}

                >
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="admin">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{fontSize: '1.75em'}}/>
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts">
                            <NavIcon>
                                {/*<i className="fa fa-fw fa-line-chart" style={{fontSize: '1.75em'}}/>*/}
                                <BsBook size={"1.75rem"} />
                            </NavIcon>
                            <NavText>
                                Quản lý Sách
                            </NavText>
                            <NavItem className={"pointer-event"} eventKey="admin/add-sach">
                                <NavText>

                                        Danh Sách Sách
                                </NavText>

                            </NavItem>
                            <NavItem eventKey="admin/add-sach">
                                <NavText>
                                    Thêm Sách
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="admin/add-sach">
                                <NavText>
                                    Thêm Sách
                                </NavText>
                            </NavItem>
                        </NavItem>

                        <NavItem eventKey="charts">
                            <NavIcon>
                                {/*<i className="fa fa-fw fa-line-chart" style={{fontSize: '1.75em'}}/>*/}
                                <BsBook size={"1.75rem"} />
                            </NavIcon>
                            <NavText>
                                Quản lý Sách
                            </NavText>
                            <NavItem className={""} eventKey="admin/add-sach">
                                <NavText>
                                    <p className={"p-0  m-0 d-block slidebar-link"}>
                                        Danh Sách Sách
                                    </p>

                                </NavText>

                            </NavItem>
                            <NavItem eventKey="admin/add-sach">
                                <NavText>
                                    Thêm Sách
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="admin/add-sach">
                                <NavText>
                                    Thêm Sách
                                </NavText>
                            </NavItem>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>

                <main className={"mt-5"}>
                    <Outlet/>
                </main>

            </div>
        </div>
    );

}

export default AdminHome;