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

    const [booksToPay, setBooksToPay] = useState<CartModel[]>([])

    const [totalMoney, setTotalMoney] = useState<number>(0);


    useEffect(() => {
        if (isLogin) {
            const url: string = `${baseUrl}/api/cart/get-product-bycart`;
            AxiosApiService.getApiResponseAuthor(url).then(
                (res) => {
                    console.log(res.status);
                    if (res.status === 204) {
                        setBooksAtCart([]);
                    } else {
                        setBooksAtCart(res.data);
                    }

                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )

        } else {
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
        } else {
            let newQuantity = 1;
            const newBookAtCart = booksAtCart.map((book) => {

                if (book.maSach === maSach) {
                    if (book.soLuong < book.soLuongTonKho) {
                        newQuantity = book.soLuong + 1;
                        return {
                            ...book, soLuong: (book.soLuong + 1)
                        };
                    } else {
                        alert("Số lượng tối đa là " + book.soLuongTonKho);
                        newQuantity = -1;
                        return book;
                    }
                } else {
                    return book;
                }

            });
            setBooksAtCart(newBookAtCart);
            const url = `${baseUrl}/api/cart/change-quantity-book?maSach=${maSach}&newQuantity=${newQuantity}`;
            AxiosApiService.postApiUrlAndAuthor(url).then(
                (res) => {

                }
            ).catch(
                (e) => {
                    if (e.response.status === 404) {
                        alert("Dữ liệu không tồn tại")
                    } else {
                        alert("Có lỗi xảy khi thay đổi số lượng")
                    }
                }
            )

        }


    }


    // giảm bớt


    const reduceQuantity = (maSach: number) => {
        if (!isLogin) {
            const newBookAtLocalStore = booksAtCart.map((book) => {
                if (book.maSach === maSach) {
                    if (book.soLuong > 1) {
                        let newBooksToPay = [...booksToPay];
                        newBooksToPay.forEach((bookAtToPay) => {
                            if (bookAtToPay.maSach === maSach) {
                                bookAtToPay.soLuong = book.soLuong - 1;
                            }
                        })
                        setBooksToPay(newBooksToPay)
                        return {
                            ...book, soLuong: (book.soLuong - 1)
                        };
                    } else {
                        alert("Số lượng tối thiểu là 1");
                        return book;
                    }
                } else {
                    return book;
                }
            });

            setBooksAtCart(newBookAtLocalStore);
            localStorage.setItem("books", JSON.stringify(newBookAtLocalStore));


        } else {
            // Lấy ra số lượng
            let newQuantity = 1;
            const newBookAtCart = booksAtCart.map((book) => {
                if (book.maSach === maSach) {
                    if (book.soLuong > 1) {
                        newQuantity = book.soLuong - 1;
                        return {
                            ...book, soLuong: (book.soLuong - 1)
                        };
                    } else {
                        alert("Số lượng tối thiểu là 1");
                        newQuantity = -1;
                        return book;
                    }
                } else {
                    return book;
                }

            });
            setBooksAtCart(newBookAtCart);
            const url = `${baseUrl}/api/cart/change-quantity-book?maSach=${maSach}&newQuantity=${newQuantity}`;
            AxiosApiService.postApiUrlAndAuthor(url).then(
                (res) => {

                }
            ).catch(
                (e) => {
                    if (e.response.status === 404) {
                        alert("Dữ liệu không tồn tại")
                    } else {
                        alert("Có lỗi xảy khi thay đổi số lượng")
                    }
                }
            )
        }
    }


    const handlerInputQuantity = (event: React.ChangeEvent<HTMLInputElement>, maSach: number) => {
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
        } else {
            let newQuantity = 1;
            const newBookAtCart = booksAtCart.map((book) => {
                // Nếu maSach của book trùng với tham số đầu vào
                if (book.maSach === maSach) {
                    // Trả về một đối tượng mới với thuộc tính soLuong được cập nhật
                    newQuantity = Number(event.target.value);
                    return {
                        ...book, soLuong: Number(event.target.value)
                    };
                }
                // Ngược lại, trả về đối tượng book không thay đổi
                return book;
            });
            setBooksAtCart(newBookAtCart);
        }

    }

    const handleChangeQuantityBookAtCart = (event: React.ChangeEvent<HTMLInputElement>, maSach: number) => {

        const newQuantity = Number(event.target.value);

        const url = `${baseUrl}/api/cart/change-quantity-book?maSach=${maSach}&newQuantity=${newQuantity}`;
        AxiosApiService.postApiUrlAndAuthor(url).then(
            (res) => {
                console.log(res);
            }
        ).catch(
            (e) => {
                console.log(e);
            }
        )

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


    const hanleSelectedItem = async (item: CartModel) => {
        // Kiểm tra xem item đã tồn tại chưa nếu chưa thì add vào nếu rồi thì xóa đi
        let index = -1;
        index = booksToPay.findIndex((book) => book.maSach == item.maSach);

        // Tạo một bản sao mới của booksToPay
        let newBooksToPay = [...booksToPay];

        if (index === -1) {
            await newBooksToPay.push(item);
            console.log(item);
            setBooksToPay(newBooksToPay);
        } else {
            await newBooksToPay.splice(index, 1);
            console.log(item);
            setBooksToPay(newBooksToPay);
        }
    }
    useEffect(() => {
        console.log(booksToPay);
        let totalMoney = 0;
        booksToPay.forEach(
            (book) => {
                totalMoney = (book.giaBan * book.soLuong) + totalMoney;
            }
        )
        console.log(totalMoney);
        setTotalMoney(totalMoney);
    }, [booksToPay, booksAtCart])


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


                    <div className={"col-md-8 p-0   rounded"}>

                        <table className="table ">
                            <tbody>
                            {
                                booksAtCart.map((item, index) => (
                                    <tr className={"tr-table-cart"}>
                                        <td className={"text-center"}>
                                            <input className="form-check-input input-cart d-block m-auto"
                                                   onClick={() => hanleSelectedItem(item)} type="checkbox" value=""
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
                                                    onChange={(event) => handlerInputQuantity(event, item.maSach)}
                                                    onBlur={(event) => handleChangeQuantityBookAtCart(event, item.maSach)}
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
                                            <a className={"btn-del-item-cart"}
                                               onClick={() => hanldeDeleteBook(item.maSach)}>
                                                <RiDeleteBin6Line size={24} className={"mt-5 ms-2"}/>
                                            </a>

                                        </td>
                                    </tr>

                                ))

                            }

                            </tbody>
                        </table>


                    </div>

                    <div className={"col-md-4 min-vh-100 row p-0 "}>
                        <div className={"col-md-1 "}>

                        </div>


                        <div className={"col-md-11  p-0 rounded"}>


                            <div className={"bg-body w-100 p-2 mb-2 rounded"}>
                                <div className={"d-flex mt-2 justify-content-between  align-items-center "}>
                                    <h5>Khuyến mại</h5>

                                </div>
                                <div className={" "}>
                                    <div>
                                        <p>MÃ GIẢM GIÁ 25K - ĐƠN HÀNG TỪ 300K</p>
                                        <small>Không Áp Dụng Cho Phiếu Quà Tặng và Sách Giáo Khoa </small>
                                    </div>
                                    <div>
                                        <button className={"btn w-100 btn-primary"} disabled> Áp dụng</button>
                                    </div>
                                </div>

                            </div>


                            <div className={"bg-body w-100 p-2 mb-2 rounded"}>
                                <div className={"d-flex mt-2 justify-content-between  align-items-center "}>
                                    <h5>Khuyến mại</h5>

                                </div>
                                <div className={" "}>
                                    <div>
                                        <p>MÃ GIẢM GIÁ 25K - ĐƠN HÀNG TỪ 300K</p>
                                        <small>Không Áp Dụng Cho Phiếu Quà Tặng và Sách Giáo Khoa </small>
                                    </div>
                                    <div>
                                        <button className={"btn w-100 btn-primary"} disabled> Áp dụng</button>
                                    </div>
                                </div>

                            </div>


                            <div className={"bg-body w-100 p-2 text-center rounded"}>
                                <div className={"d-flex mt-2 justify-content-between  align-items-center "}>
                                    <span>Thành Tiền</span>
                                    <span>2500000</span>
                                </div>
                                <hr/>
                                <div className={"d-flex mt-2 justify-content-between align-items-center "}>
                                    <h6>Tổng Số Tiền Gồm VAT</h6>
                                    <h5>{formattedPrice(totalMoney)}</h5>
                                </div>
                                <small className={"text-danger float-md-start my-2"}>( Giảm giá chỉ áp dụng cho bán lẻ
                                    )</small>
                                <button type="button" className="w-100 btn btn-danger btn-lg">Thanh Toán</button>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }


}


export default Cart;
