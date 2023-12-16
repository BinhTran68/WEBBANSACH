import React, { useEffect, useState } from 'react';

import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { getAllBooks } from "../../../api/SachAPI";
import BookModel from "../../../models/BookModel";
import BookProps from "../../product/component/BookProps";
import {Link} from "react-router-dom";



//
// interface Props { fetchBooks: (pageNumber: number, pageSize: number) => Promise<BookModel[]>; }

interface Props { fetchBooks: (pageNumber: number, pageSize: number) => Promise<BookModel[]>; pageSize: number; pageNumber: number; }
//  Nếu không FeaturedProducts: React.FC<Props> nếu không thì sẽ chỉ là component rỗng
const FeaturedProducts: React.FC<Props> = ({ fetchBooks, pageNumber, pageSize }) => {

    const [productList, setProductList] = useState<BookModel[]>([]); // Khi cập nhật thì tự động cập nhật giao diện

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        fetchBooks(pageNumber,pageSize).then(
            (res) => {
                console.log(res);
                setProductList(res);
                setDangTaiDuLieu(false);
            }
        ).catch(

        )

    }, [fetchBooks]) // Chỉ gọi 1 lần

    if (dangTaiDuLieu) {
        return (
            <div className='d-flex mt-5 mb-5 align-items-center justify-content-center'  >

                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi : {baoLoi}</h1>
            </div>

        )
    }
    return (
        <div className={' container'}>
            <div className={"row mt-4 "}>
                {
                    productList.map((book) => (
                        <div className='col-xl-2 mb-2 col-md-4 book-hover'>
                            <BookProps key={book.maSach} book={book} />
                        </div>
                    ))
                }
            </div>
            <div className={'mt-3 mb-3 d-flex justify-content-around align-items-center'}>
                <Link to={"/san-phams"} type="button" className="btn w-25 btn-outline-danger">Xem thêm</Link>
            </div>
        </div>
    );

}

export default FeaturedProducts;