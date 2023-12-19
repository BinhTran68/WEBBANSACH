import React, {useEffect, useState} from 'react';

import BookProps from "./component/BookProps";
import BookModel from "../../models/BookModel";
import {getAllBooks} from "../../api/SachAPI";
import Pagination from "@mui/material/Pagination";
import {Box} from '@mui/material';
import DangTaiDuLieuComponent from '../ultils/DangTaiDuLieuComponent';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';


const ListProduct: React.FC = () => {

    const [productList, setProductList] = useState<BookModel[]>([]); // Khi cập nhật thì tự động cập nhật giao diện

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPage, setTotalPage] = useState(0);

    const [filterByPrice, setFillterByPrice] = useState();




    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (event: any, page: number) => {
        // Cập nhật state của currentPage bằng value
        // @ts-ignore
        setSearchParams({page: page});
        setCurrentPage(page);
    };



    useEffect(() => {
        const page = Number(searchParams.get("page")) || 1;
        setCurrentPage(page);

        getAllBooks(currentPage - 1).then(
            data => {
                setProductList(data.result);
                setDangTaiDuLieu(false);
                setTotalPage(data.totalPage);
                window.scrollTo(0, 150)

            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(true);


            }
        )

    }, [currentPage]) // Chỉ gọi 1 lần





    if (dangTaiDuLieu) {
        return (
            <>
                <DangTaiDuLieuComponent/>
            </>
        )
    }

    if (baoLoi) {
        return (
            <div>
                <h6>Có lỗi xảy ra </h6>
                <Link to={'/'}>Home</Link>
            </div>

        )
    }
    return (
        <div className={"container"}>

            <div className={' row p-0'}>
                <div className='col-md-2  p-4  p-0'>
                    <div className='ms-2  '>
                        <h6>Danh mục sản phẩm</h6>
                        <div className='ms-3 d-flex flex-column'>
                            <span>English Book</span>
                            <span>Sách Tiếng Việt</span>
                        </div>
                    </div>
                    <div className='ms-2'>
                        <h6>Thương Hiệu</h6>
                        <div className='ms-3'>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                                <label className="form-check-label">
                                    Default checkbox
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                                <label className="form-check-label">
                                    Checked checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='ms-1'>
                        <h6>Khoảng Giá</h6>
                        <div className='ms-2'>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="
                            " id="flexCheckDefault"/>
                                <small className="form-check-label">
                                    0đ - 150,000đ
                                </small>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                                <small className="form-check-label">
                                    150,000đ - 300,000đ
                                </small>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                                <small className="form-check-label">
                                    300,000đ - 500,000đ
                                </small>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                                <small className="form-check-label">
                                    500,000đ - 700,000đ
                                </small>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                                <small className="form-check-label">
                                    700,000đ - Trở lên
                                </small>
                            </div>
                        </div>
                    </div>

                </div>


                <div className='col-md-10 bg-white p-0 overflow-hidden'>
                    <div>
                        <div className=' d-flex align-items-center justify-content-start'>
                            <a className='p-3' href="">Phổ Biến</a>
                        </div>
                    </div>

                    <div className={"row mb-4 mt-4 "}>
                        {
                            productList.map((book) => (
                                <div className='col-md-4 col-sm-6 col-6 col-xl-3 px-0 book-hover'>
                                    <BookProps key={book.maSach} book={book}/>
                                </div>


                            ))
                        }
                    </div>
                    <Box display="flex" fontSize={"30px"} justifyContent="center">
                        <Pagination page={currentPage} size={"large"} onChange={handleChange} shape="rounded"
                                    count={totalPage} color="secondary"/>
                    </Box>
                </div>
            </div>
        </div>


    );

}


export default ListProduct