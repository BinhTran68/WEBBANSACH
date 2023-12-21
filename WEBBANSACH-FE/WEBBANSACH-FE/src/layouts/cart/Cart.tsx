import React, {Component, useEffect, useState} from 'react';

import {LiaCartArrowDownSolid} from "react-icons/lia";
import {Link} from "react-router-dom";
import {useAuth} from "../ultils/useAuth";
import CartModel from "../../models/CartModel";
import "./cart.css"
import {RiDeleteBin6Line} from "react-icons/ri";
import {baseUrl, formattedPrice} from "../ultils/config";
import AxiosApiService from "../../api/admin/AxiosApiService";

const Cart = () => {

    const [isLogin, userName, logout] = useAuth();

    const [booksAtCart, setBooksAtCart] = useState<CartModel[]>([]);


    useEffect(() => {
        if (isLogin) {
            const url:string = `${baseUrl}/api/cart/get-product-bycart`;
            AxiosApiService.getApiResponseAuthor(url).then(
                (res) => {
                    console.log(res.status);
                    if (res.status === 204) {
                        setBooksAtCart([]);
                    }else {
                        setBooksAtCart(res.data);
                    }

                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )

        }else {
            const getBooksAtLocalStore: CartModel[] = JSON.parse(localStorage.getItem("books") as string);
            setBooksAtCart(getBooksAtLocalStore);
        }

    }, [isLogin])


    const increasingQuantity = (maSach: number) => {
        if (!isLogin) {
            // Thêm 1 sản phẩm vào danh sách giỏ hàng trong localsotre
            const newBookAtLocalStore = booksAtCart.map((book) => {
                if (book.maSach === maSach) {
                    return {
                        ...book, soLuong: (book.soLuong + 1)
                    };
                } else {
                    return book;
                }

            });
            setBooksAtCart(newBookAtLocalStore);
            localStorage.setItem("books", JSON.stringify(newBookAtLocalStore));

        }


    }


    const reduceQuantity = (maSach: number) => {
        if (!isLogin) {
            const newBookAtLocalStore = booksAtCart.map((book) => {
                if (book.maSach === maSach) {
                    return {
                        ...book, soLuong: (book.soLuong - 1)
                    };
                } else {
                    return book;
                }

            });
            setBooksAtCart(newBookAtLocalStore);
            localStorage.setItem("books", JSON.stringify(newBookAtLocalStore));
        }
    }

    const hanldeDeleteBook = (maSach: number) => {
        if (!isLogin) {
            const index = booksAtCart.findIndex((book) => book.maSach === maSach);

            if (index !== -1) {
                booksAtCart.splice(index, 1);
            }
            const newBooksAtLocalStore = booksAtCart;
            localStorage.setItem("books", JSON.stringify(newBooksAtLocalStore));
            setBooksAtCart(newBooksAtLocalStore);


        }
    }

    const handlerQuantity = (event: React.ChangeEvent<HTMLInputElement>, maSach: number) => {
        if (!isLogin) {
            // Tạo một bản sao mới của mảng booksAtLocalStore
            const newBooksAtLocalStore = booksAtCart.map((book) => {
                // Nếu maSach của book trùng với tham số đầu vào
                if (book.maSach === maSach) {
                    // Trả về một đối tượng mới với thuộc tính soLuong được cập nhật
                    return {
                        ...book, soLuong: Number(event.target.value)
                    };
                }
                // Ngược lại, trả về đối tượng book không thay đổi
                return book;
            });

            setBooksAtCart(newBooksAtLocalStore);
            localStorage.setItem("books", JSON.stringify(newBooksAtLocalStore));
        }

    }

    // Check xem người dùng đã đăng nhập chưa. Nếu người dùng đã đăng nhập thì lấy danh sách
    // if (!isLogin) {
        if (booksAtCart === null || booksAtCart.length === 0) {
            return (
                <div className={"min-vh-100"}>
                    <div className={"py-3"}>
                        <h4>
                            GIỎ HÀNG ( 0 Sản Phẩm)
                        </h4>
                    </div>
                    <div className={"bg-light my-2 rounded text-center  py-5"}>
                        <div>
                            <LiaCartArrowDownSolid color={""} size={160}/>
                        </div>
                        <small>
                            Chưa có sản phẩm trong giỏ hàng
                        </small>

                        <div className={"text-center  mt-3"}>
                            <Link to={"/san-phams"} type="button" className="btn w-25 btn-danger">Mua Sắm Ngay</Link>
                        </div>

                        <div className={`text-center mt-3  ${isLogin ? "d-none" : ""}`}>
                            <Link to={"/dang-nhap"} type="button" className="btn w-25 btn-danger">Đăng Nhập Ngay</Link>
                        </div>
                    </div>


                </div>
            );

        } else {


            return (
                <div className={"container  p-0"}>

                    <div className={"my-3"}>
                        <h4>Giỏ Hàng ( {booksAtCart.length} Sản Phẩm )</h4>
                    </div>

                    <div className={"row"}>

                        <div className={"col-md-9 p-0  rounded"}>

                        </div>
                        <div className={"col-md-3 bg-light p-0 "}>

                        </div>

                        <div className={"col-md-9 p-0   rounded"}>

                            <table className="table ">


                                <tbody>
                                {
                                    booksAtCart.map((item, index) => (
                                        <tr className={"tr-table-cart"}>
                                            <td scope="row">
                                                <input className="form-check-input" type="checkbox" value=""
                                                       id="flexCheckDefault"/>
                                            </td>
                                            <td>
                                                <div>
                                                    <img className={"image-cart"} src={item.linkImage} alt="ảnh sách"/>
                                                </div>
                                            </td>
                                            <td className={""}>
                                                <div className={"d-flex  flex-column td-item justify-content-between"}>
                                                    <div className={"td-cart"}>
                                                        <p>{item.tenSach}</p>
                                                    </div>
                                                    <div className={"d-flex "}>
                                                        <strong
                                                            className={"me-2 price-book  text-danger"}> {formattedPrice(item.giaBan)}</strong>
                                                        <del className={""}>{formattedPrice(item.giaNiemYet)}</del>
                                                    </div>

                                                </div>

                                            </td>

                                            <td className={"td-quantity"}>

                                                <div className='d-flex align-items-center mt-5'>
                                                    <button style={{minWidth: '40px'}}
                                                            className='btn btn-outline-danger me-2'
                                                            onClick={() => reduceQuantity(item.maSach)}>-
                                                    </button>
                                                    <input

                                                        className='w-25  form-control border border-danger text-center'
                                                        style={{'minWidth': '50px', 'maxWidth': '50px'}}
                                                        type='number'
                                                        min={1}
                                                        onChange={(event) => handlerQuantity(event, item.maSach)}
                                                        value={booksAtCart[index].soLuong}/>
                                                    <button className='btn btn-outline-danger ms-2'
                                                            style={{minWidth: '40px'}}
                                                            onClick={() => increasingQuantity(item.maSach)}>+
                                                    </button>
                                                </div>

                                            </td>
                                            <td className={"h-100 "}>
                                                <strong className={"mt-5 d-block text-danger"}>
                                                    {formattedPrice(item.soLuong * item.giaBan)}
                                                </strong>
                                            </td>
                                            <td>
                                                <a onClick={() => hanldeDeleteBook(item.maSach)} >
                                                    <RiDeleteBin6Line size={24} className={"mt-5 ms-2"}/>
                                                </a>

                                            </td>
                                        </tr>

                                    ))

                                }

                                </tbody>
                            </table>


                        </div>

                        <div className={"col-md-3 min-vh-100 b g-light p-0 "}>

                        </div>
                    </div>

                </div>
            )
        }

    // }
    // return (
    //     <div className={"min-vh-100"}>
    //         <div className={"py-3"}>
    //             <h4>
    //                 GIỎ HÀNG ( Sản Phẩm)
    //             </h4>
    //         </div>
    //         <div className={"bg-light my-2 rounded text-center  py-5"}>
    //             <div>
    //                 <LiaCartArrowDownSolid color={""} size={160}/>
    //             </div>
    //             <small>
    //                 Chưa có sản phẩm trong giỏ hàng
    //             </small>
    //
    //             <div className={"text-center  mt-3"}>
    //                 <Link to={"/san-phams"} type="button" className="btn w-25 btn-danger">Mua Sắm Ngay</Link>
    //             </div>
    //
    //             <div className={`text-center mt-3 ${isLogin ? "d-none" : ""}`}>
    //                 <Link to={"/dang-nhap"} type="button" className="btn w-25 btn-danger">Đăng Nhập Ngay</Link>
    //             </div>
    //         </div>
    //
    //
    //     </div>
    // );

}


export default Cart;
