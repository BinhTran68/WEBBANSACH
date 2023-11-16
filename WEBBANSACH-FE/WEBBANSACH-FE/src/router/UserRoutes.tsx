import React, {Component} from 'react';

import { Route } from "react-router-dom";
import HomePage from "../layouts/home/HomePage";
import ListProduct from "../layouts/product/ListProduct";
import ProductDetail from "../layouts/product/component/ProductDetail";
import DangKy from "../layouts/user/DangKy";
import DangNhap from "../layouts/user/DangNhap";
import About from "../layouts/home/component/About";
import NotFound404 from "../layouts/ultils/NotFound404";
import ErrorPage from "../layouts/erorr/ErrorPage";
import Test from "../layouts/user/Test";
import KichHoatTaiKhoan from "../layouts/user/KichHoatTaiKhoan";


const UserRoutes = () => {

    return (
            <>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/san-phams' element={<ListProduct/>}/>
                <Route path='/san-phams/:maSach' element={<ProductDetail/>}/>
                {/* Đăng kí */}
                <Route path='/dangky' element={<DangKy/>}/>

                {/* Đăng nhập */}
                <Route path='/dang-nhap' element={<DangNhap/>}/>
                <Route path='/gioi-thieu' element={<About/>}/>
                <Route path='/404notfound' element={<NotFound404/>}/>
                <Route path='/error' element={<ErrorPage/>}/>
                <Route path='/test' element={<Test/>}/>
                <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan/>}/>
            </>
    );

}

export default UserRoutes;