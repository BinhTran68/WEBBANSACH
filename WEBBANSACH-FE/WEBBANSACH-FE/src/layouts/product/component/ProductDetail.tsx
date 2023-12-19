import React, {useEffect, useState} from 'react'
import {getBookById, getFlashSaleBook, getTheLatestBook} from '../../../api/SachAPI'
import {useParams} from 'react-router-dom'
import BookModel from '../../../models/BookModel';
import {error} from 'console';
import HinhAnhSanPham from './HinhAnhSanPham';
import ProductReview from "./ProductReview";
import DangTaiDuLieuComponent from '../../ultils/DangTaiDuLieuComponent';
import renderRaiting from '../../ultils/renderRaiting';
import formattedPrice from '../../ultils/formattedPrice';
import FeaturedProducts from "../../home/component/FeaturedProducts";
import AxiosApiService from "../../../api/admin/AxiosApiService";
import {baseUrl} from "../../ultils/config";
import {useAuth} from "../../ultils/useAuth";
import CartModel from "../../../models/CartModel";


const ProductDetail = () => {

    // Lấy mã sách từ url
    const {maSach} = useParams();

    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach + '');
        if (Number.isNaN(maSachNumber)) {
            maSachNumber = 0;
        }
    } catch (error) {
        maSachNumber = 0;

    }

    const [book, setBook] = useState<BookModel | null>(null);

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    const [iconImageLink, setIconImageLink] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [isLogin, userName, logout] = useAuth();


    const quantityBookExits = book?.soLuong ? book.soLuong : 0;

    const increasingQuantity = () => {

        if (quantity < quantityBookExits) {
            setQuantity(quantity + 1);
        }

    }

    const reduceQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    }

    const handlerQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= quantityBookExits) {
            setQuantity(newQuantity);
        }
        if (!isNaN(newQuantity) && newQuantity > quantityBookExits) {
            setQuantity(quantityBookExits);
        }

    }

    const handlerBuyNow = () => {
        alert("Chuyển sang trang đăng nhập");
    }

    const booksAtLocalStore: CartModel[] = JSON.parse(localStorage.getItem("books") as string  || "[]" ) ;



    const handlerAddToCard = () => {
        if (!isLogin) {
            const bookToCart: CartModel = {
                maSach: book?.maSach?book.maSach:0,
                tenSach: book?.tenSach?book.tenSach:"",
                giaBan: book?.giaBan?book.giaBan:0,
                giaNiemYet: book?.giaNiemYet?book.giaNiemYet:0,
                linkImage:iconImageLink,
                soLuong:quantity,
                createdDate:Date.now()
            }

            let bookExits = booksAtLocalStore.find((bookCart) => bookCart.maSach === bookToCart.maSach );

            if (bookExits) {
                let index = booksAtLocalStore.findIndex((bookCart) => bookCart.maSach === bookToCart.maSach);

                booksAtLocalStore[index].soLuong = bookToCart.soLuong + bookExits.soLuong;
                booksAtLocalStore[index].createdDate = Date.now();

            } else  {
                booksAtLocalStore.push(bookToCart);
            }

            const bookJson = JSON.stringify(booksAtLocalStore);
            localStorage.setItem("books",bookJson )
        }

    }



    useEffect(() => {
        const url = `${baseUrl}/api/client/get-info-sach?maSach=${maSach}`;

        AxiosApiService.getApiResponse(url).then((book) => {
                // @ts-ignore
            setBook(book.data);
                setDangTaiDuLieu(false);
            }
        ).catch((error) => {
            setBaoLoi(error.message);
            setDangTaiDuLieu(false);
        });
    }, [maSach])


    // Gọi api lấy ra thêm thông tin khác của quyển sách như tên nhà xuất bản ....




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
                <h1>Gặp lỗi : {baoLoi}</h1>
            </div>

        )
    }

    if (!book) {
        return (
            <div>
                <h1>sach k tồn tại</h1>
            </div>

        )
    }

    const getLinkByChild = (data:string) => {
        setIconImageLink(data);
    }



    return (
        <div className='container  pt-2 mt-2'>
            <div className='row'>
                <div className='col-md-4'>
                    <HinhAnhSanPham getLinkIconImage={getLinkByChild} maSach={maSachNumber}/>
                </div>
                <div className='col-md-8'>
                    <div className='row '>
                        <div className='col-md-12'>
                            <h3>{book.tenSach}</h3>
                            <h5>{renderRaiting(book.trungBinhXepHang ? book.trungBinhXepHang : 0)}</h5>
                            <div className={"d-flex align-items-center "}>
                                <h2 className={"text-danger me-3"}>{formattedPrice(book.giaBan ? book.giaBan : 0)}</h2>
                                <h6 className={"me-3"}>
                                    <del>{formattedPrice(book.giaNiemYet ? book.giaNiemYet : 0)}</del>
                                </h6>
                                <div>

                                </div>
                            </div>
                            <div className={"p-1"}>
                                <div className={"row"}>
                                    <div className={"col-7"}>
                                        <p>Tác giả : <strong>{book.tenTacGia} </strong></p>
                                        <p>Mã Phát Hành : <strong>{book.isbn} </strong></p>

                                    </div>
                                    <div className={"col-5"}>
                                        <p>Hình Thức bìa : <strong> {book.loaiBia}</strong></p>
                                        <p>Nhà Xuất  : <strong> {book.nhaXuatBan}</strong></p>
                                    </div>

                                </div>

                            </div>

                            <div className={"d-flex"}>
                                <div className={"w-50 "}>
                                    <h5 className='mb-2'>Số Lượng :</h5>
                                    <div className='d-flex align-items-center'>
                                        <button style={{minWidth: '40px'}} className='btn btn-outline-danger me-2'
                                                onClick={reduceQuantity}>-
                                        </button>
                                        <input

                                            className='w-25  form-control border border-danger text-center'
                                            style={{'minWidth': '50px'}}
                                            type='number'
                                            min={1}
                                            onChange={handlerQuantity}
                                            value={quantity}/>
                                        <button className='btn btn-outline-danger ms-2' style={{minWidth: '40px'}}
                                                onClick={increasingQuantity}>+
                                        </button>
                                    </div>
                                    {
                                        book.giaBan && (
                                            <div className='mt-2 '>
                                                Số tiền tạm tính :
                                                <h4 className='text-danger'>{formattedPrice(quantity * book.giaBan)}</h4>
                                            </div>
                                        )
                                    }
                                    <div className='d-grid gap-3'>
                                        <button type='button' onClick={handlerBuyNow}
                                                className='btn btn-danger mt 3'>Mua
                                            Ngay
                                        </button>
                                        <button type='button' onClick={handlerAddToCard}
                                                className='btn btn-outline-secondary mt 3'>Thêm vào giỏ hàng
                                        </button>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>

                </div>
            </div>
            <div className={"row mt-5 p-0"}>
                <div className={"border rounded mt-2"}>
                    <h4 className={"m-0 ms-3 mt-3"}>FAHASHA GIỚI THIỆU</h4>

                    <FeaturedProducts fetchBooks={getTheLatestBook} pageNumber={0} pageSize={6}/>

                </div>
            </div>

            <div>
                <div className={"border rounded row mt-4"}>
                    <h4 className={"m-0 ms-3 mb-2 mt-3"}>Thông tin sản phẩm</h4>
                    <div className={"col-md-6"}>
                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Mã hàng
                            </div>
                            <div className={"col-6"}>
                                {book.isbn}
                            </div>
                        </div>

                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Dự kiến có hàng
                            </div>
                            <div className={"col-6"}>
                                20/11/2022
                            </div>
                        </div>

                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Nhà Phát Hành
                            </div>
                            <div className={"col-6"}>
                                {book.nhaPhatHanh}
                            </div>
                        </div>

                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Tác giả
                            </div>
                            <div className={"col-6"}>
                                {book.tenTacGia}
                            </div>
                        </div>
                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Người Dịch
                            </div>
                            <div className={"col-6"}>
                                {book.dichGia?book.dichGia:"None"}
                            </div>
                        </div>
                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Nhà Xuất Bản
                            </div>
                            <div className={"col-6"}>
                                {book.nhaXuatBan}
                            </div>
                        </div>

                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Năm xuất bản
                            </div>
                            <div className={"col-6"}>
                                2020
                            </div>
                        </div>

                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Trọng Lượng
                            </div>
                            <div className={"col-6"}>
                                350 gam
                            </div>
                        </div>
                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Số Trang
                            </div>
                            <div className={"col-6"}>
                                {book.soTrang}
                            </div>
                        </div>

                        <div className={"row mt-2 mb-2"}>
                            <div className={"col-6"}>
                                Loại Bìa
                            </div>
                            <div className={"col-6"}>
                                {book.loaiBia}
                            </div>
                        </div>


                    </div>
                    <div className={"mt-3 px-2 mb-2 "}>
                        <p> Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại
                            sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí
                            đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...
                        </p>
                        <hr/>
                    </div>
                    <div>
                        <p>{book.moTa}</p>
                    </div>






                </div>

            </div>

            <div>
                <ProductReview   maSach={maSachNumber}/>
            </div>
        </div>
    )
}

export default ProductDetail
