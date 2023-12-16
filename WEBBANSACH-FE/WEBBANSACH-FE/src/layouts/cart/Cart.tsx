import React, {Component} from 'react';

import {LiaCartArrowDownSolid} from "react-icons/lia";
import {Link} from "react-router-dom";

const Cart = () =>  {
        return (
            <div className={"min-vh-100"}>
                <div className={"py-3"}>
                    <h4>
                        GIỎ HÀNG ( Sản Phẩm)
                    </h4>
                </div>
                <div className={"bg-light my-2 rounded text-center  py-5"}>
                    <div>
                        <LiaCartArrowDownSolid color={""}  size={160} />
                    </div>
                    <small>
                        Chưa có sản phẩm trong giỏ hàng
                    </small>

                    <div className={"text-center  mt-3"}>
                        <Link to={"/san-phams"} type="button" className="btn w-25 btn-danger">Mua Sắm Ngay</Link>
                    </div>

                    <div className={"text-center mt-3"}>
                        <Link to={"/dang-nhap"} type="button" className="btn w-25 btn-danger">Đăng Nhập Ngay</Link>
                    </div>
                </div>




            </div>
        );

}



export default Cart;
