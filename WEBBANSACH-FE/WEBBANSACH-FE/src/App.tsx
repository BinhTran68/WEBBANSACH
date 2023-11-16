import React from 'react';
import './App.scss';
import Navbar from './layouts/header-footer/Navbar';
import HomePage from './layouts/home/HomePage';
import Footer from "./layouts/header-footer/Footer";
import HeaderBaner from './layouts/header-footer/HeaderBaner';
import ListProduct from './layouts/product/ListProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/home/component/About';
import ProductDetail from './layouts/product/component/ProductDetail';
import NotFound404 from './layouts/ultils/NotFound404';
import NavbarBottom from './layouts/product/component/NavbarBottom';
import ErrorPage from './layouts/erorr/ErrorPage';
import DangKy from './layouts/user/DangKy';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';
import DangNhap from './layouts/user/DangNhap';
import Test from "./layouts/user/Test";
import ThemSachAdmin from "./layouts/admin/ThemSachAdmin";
import HomeAdmin from "./layouts/admin/HomeAdmin";
import UserRoutes from "./router/UserRoutes";
import AdminLayout from "./router/AdminLayout";
import UserLayout from "./router/UserLayout";
import AdminHome from "./layouts/admin/component/AdminHome";
import QuanLySach from "./layouts/admin/component/QuanLySach";


function App() {

  // @ts-ignore
  return (
    <>

      <div className={''}>
        {/*<BrowserRouter>*/}
        {/*  <Navbar />*/}
        {/*  <NavbarBottom/>*/}
        {/*  <Routes>*/}
        {/*    <Route path='/' element={<HomePage />} />*/}
        {/*    <Route path='/san-phams' element={<ListProduct />} />*/}
        {/*    <Route path='/san-phams/:maSach' element={<ProductDetail/>} />*/}
        {/*    /!* Đăng kí *!/*/}
        {/*    <Route path='/dangky' element={<DangKy />}/>*/}

        {/*    /!* Đăng nhập *!/*/}
        {/*    <Route path='/dang-nhap' element={<DangNhap />}/>*/}
        {/*    <Route path='/gioi-thieu' element={<About />} />*/}
        {/*    <Route path='/404notfound' element={<NotFound404 />} />*/}
        {/*    <Route path='/error' element={<ErrorPage />} />*/}
        {/*    <Route path='/test' element={<Test />} />*/}
        {/*    <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan/>}/>*/}
        {/*    <Route path={'/admin/add-sach'} element={<ThemSachAdmin/> } />*/}
        {/*    <Route path={'/admin'} element={<HomeAdmin/> } />*/}
        {/*  </Routes>*/}
        {/*  <Footer />*/}
        {/*</BrowserRouter>*/}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserLayout />}>
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
              <Route path="*" element={<NotFound404 />} />
            </Route>
            <Route path={"/admin"} element={<AdminHome/>} >
              <Route path={"/admin/add-sach"} element={<ThemSachAdmin/>}/>
              <Route path={"/admin/quan-ly-sach"} element={<QuanLySach/>}/>

            </Route>

          </Routes>
        </BrowserRouter>




      </div>
    </>

  );
}

export default App;
