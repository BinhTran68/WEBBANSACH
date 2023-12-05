import React from 'react';
import './App.scss';

import HomePage from './layouts/home/HomePage';
import ListProduct from './layouts/product/ListProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/home/component/About';
import ProductDetail from './layouts/product/component/ProductDetail';
import NotFound404 from './layouts/ultils/NotFound404';
import ErrorPage from './layouts/erorr/ErrorPage';
import DangKy from './layouts/user/DangKy';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';
import DangNhap from './layouts/user/DangNhap';
import Test from "./layouts/user/Test";
import ThemSachAdmin from "./layouts/admin/component/ThemSachAdmin";
import UserLayout from "./router/UserLayout";
import AdminHome from "./layouts/admin/component/AdminHome";
import QuanLySach from "./layouts/admin/component/QuanLySach";
import UpdateSachAdmin from "./layouts/admin/component/UpdateSachAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateImageSach from './layouts/admin/component/UpdateImageSach';


function App() {

  // @ts-ignore
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/san-phams' element={<ListProduct/>}/>
              <Route path='/san-phams/:maSach' element={<ProductDetail/>}/>
              <Route path='/dangky' element={<DangKy/>}/>
              <Route path='/dang-nhap' element={<DangNhap/>}/>
              <Route path='/gioi-thieu' element={<About/>}/>
              <Route path='/404notfound' element={<NotFound404/>}/>
              <Route path='/error' element={<ErrorPage/>}/>
              <Route path='/test' element={<Test/>}/>
              <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan/>}/>
              <Route path="*" element={<NotFound404 />} />
              <Route path="/404" element={<NotFound404 />} />
            </Route>
            <Route path={"/admin"} element={<AdminHome/>} >
              <Route path={"/admin/add-sach"} element={<ThemSachAdmin/>}/>
              <Route path={"/admin/quan-ly-sach"} element={<QuanLySach/>}/>
              <Route path={"/admin/quan-ly-sach/edit/:maSach"} element={<UpdateSachAdmin/>}/>
              <Route path={"/admin/quan-ly-sach/edit-image/:maSach"} element={<UpdateImageSach/>}/>
            </Route>

          </Routes>
        </BrowserRouter>





    </>

  );
}

export default App;
