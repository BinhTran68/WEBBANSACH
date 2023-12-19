import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {getBookBySearchValue} from '../../api/SachAPI';
import BookModel from "../../models/BookModel";
import '../header-footer/header-footer.scss'
import BookSearch from '../product/component/BookSearch';
import {debounce} from '@mui/material';
import {Search} from 'react-bootstrap-icons';
import {Link} from "react-router-dom";
import {getToken} from '../ultils/config';
import {CiLogout} from "react-icons/ci";
import {MdOutlineHistory} from "react-icons/md";
import {FaUser, FaUserEdit} from "react-icons/fa";
import {FiLogIn} from "react-icons/fi";
import {useAuth} from "../ultils/useAuth";


const Navbar = () => {

    const [querySearch, setQuerySearch] = useState('');

    const [productList, setProductList] = useState<BookModel[]>([]);

    const [isLogin, userName, logout] = useAuth();

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        let query = e.target.value.trim();
        if (query == '') {
            productList.length = 0;
        }
        setQuerySearch(query);


    }

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            if (query === "") {
                setProductList([]);
                return;
            }
            // Nếu query không rỗng, gọi hàm getBookBySearchValue
            getBookBySearchValue(query)
                .then((data) => {
                    setProductList(data.result);
                })
                .catch((error) => {
                    console.log("có lỗi");
                });
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(querySearch); // Gọi debouncedSearch function với query hiện tại
        return () => {
            debouncedSearch.clear(); // Hủy bỏ debouncedSearch function khi component unmount
        };
    }, [querySearch, debouncedSearch]);



    const hanleLogOut = () => {
        // @ts-ignore
        logout();
    }


    // @ts-ignore
    return (

        <nav className="container navbar navbar-expand-lg bg-light navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
                         width="250px" height='50px' alt=""/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Thể Loại
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <li><a className="dropdown-item" href="1">Thể loại 1</a></li>
                                <li><a className="dropdown-item" href="2">Thể loại 2</a></li>
                                <li><a className="dropdown-item" href="3">Thể loại 3</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown ">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Nhà phát hành
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <li><a className="dropdown-item" href="#">Quy định 1</a></li>
                                <li><a className="dropdown-item" href="#">Quy định 2</a></li>
                                <li><a className="dropdown-item" href="#">Quy định 3</a></li>
                            </ul>
                        </li>

                    </ul>
                </div>

                {/* Tìm kiếm */}
                <form className="d-flex position-relative">
                    <input className="form-control input-search me-4" value={querySearch} onChange={onSearchInputChange}
                           type="search" placeholder="Tìm kiếm" aria-label="Search"/>
                    <button className="btn btn-danger" type="submit"><Search/></button>
                    <div
                        className={` ${querySearch == '' ? ' ' : ''} hidden position-absolute top-100  rounded-3  ulsearch-nav`}>

                        <ul className="list-group" onClick={() => setQuerySearch("")}>
                            {
                                productList.map((book) =>
                                    <BookSearch book={book}/>
                                )
                            }
                        </ul>
                    </div>
                </form>


                {/* Biểu tượng giỏ hàng */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <Link className="nav-link" to="/gio-hang">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </li>
                </ul>

                {/* Biểu tượng đăng nhập */}
                <ul className="navbar-nav me-1">

                    <li className="nav-item ">


                    </li>
                </ul>

                <span className="nav-item dropdown me-2">
                    <a className="nav-link dropdown-toggle d-flex justify-content-center align-items-center" href="#"
                       id="navbarDropUser" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        {
                            isLogin ? (
                                    <Link className="nav-link mx-1" to={"/dangky"}>
                                    <i className="fas fa-user"/>{`Xin Chào, ${userName}`}
                                </Link>
                                ) : (<Link className="nav-link" to={"/dangky"}>
                                        <i className="fas fa-user"/>
                                    </Link>
                                )
                        }
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropUser">
                        <li><a className="dropdown-item" href="#">
                              {
                                  isLogin ? <a className="nav-link mx-1" onClick={hanleLogOut}>
                                      <CiLogout className={"me-2"} size={22}/> Đăng Xuất
                                  </a> : <Link className="nav-link" to={"/dang-nhap"}>
                                      <FiLogIn className={'me-2'} size={22}/> Đăng nhập
                                  </Link>
                              }

                        </a></li>
                        <li><a className="dropdown-item" href="#">
                            {
                                isLogin ? <Link className="nav-link mx-1" to={"/dangky"}>
                                    <FaUser className={"me-2"} size={22}/> Thông tin tài khoản
                                </Link> : <Link className="nav-link" to={"/dangky"}>
                                    <FaUserEdit className={"me-2"} size={22}/> Đăng Kí
                                </Link>
                            }
                            </a></li>
                        <li>  <a className="dropdown-item" href="#">
                            {
                                isLogin ? <Link className="nav-link mx-1" to={"/dangky"}>
                                    <MdOutlineHistory className={"me-2"} size={22}/> Lịch Sử mua hàng
                                </Link> : <span></span>
                            }


                        </a></li>
                    </ul>
                </span>


            </div>
        </nav>


    )

}
export default Navbar
