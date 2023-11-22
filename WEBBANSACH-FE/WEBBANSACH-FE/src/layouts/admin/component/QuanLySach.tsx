import React, {Component, useEffect, useState} from 'react';
import {getSacSachResponseByPage} from "../../../api/admin/GetSachResponse";
import * as url from "url";
import {baseUrl} from "../../ultils/config";
import SachResponseModel from "../../../models/SachResponseModel";
import {Button, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";

const QuanLySach = () => {

    const [sachResponseList, setSachResponseList] = useState<SachResponseModel[]>([]);

    const url: string = `${baseUrl}/api/admin/san-pham/get-book-response?pageNumber=1&pageSize=10&sortBy=s.maSach&typeSort=desc`

    useEffect(() => {

        getSacSachResponseByPage(url).then(
            (res) => {
                return res.result;

            }
        ).then(
            (data) => {
                setSachResponseList(data);
            }
        )

    }, [])


    return (
        < >
            <div>

                <div className={"mt-5 text-center my-3 pt-2"}>
                    <h2 className={"mt-5"}>Quản Lý Sách</h2>
                </div>

                <table className="table">
                    <thead>
                    <tr className={"text-center"}>
                        <th scope="col">Mã Sách</th>
                        <th scope="col">Tên Sách</th>
                        <th scope="col">Tên Tác Giả</th>
                        <th scope="col">Hình Ảnh</th>
                        <th scope="col">Mã ISBN</th>
                        <th scope="col">Nhà Phát Hành</th>
                        <th scope="col">Nhà Xuất bản</th>
                        <th scope="col">Số Lượng</th>
                        <th scope="col">Số Trang</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        sachResponseList.map((sachRes) => (
                            <tr className={"text-center"}>
                                <td scope={"col"}>{sachRes.maSach}</td>
                                <td style={{wordWrap: "break-word"}}>{sachRes.tenSach}</td>
                                <td scope={"col"}>{sachRes.tenTacGia}</td>
                                <td scope={"col"}>
                                    <img src={sachRes.hinhAnhBase64} width={"60rem"} alt=""/>
                                </td>
                                <td scope={"col"}>{sachRes.isbn}</td>
                                <td scope={"col"}>{sachRes.nhaPhatHanh}</td>
                                <td scope={"col"}>{sachRes.nhaXuatBan}</td>
                                <td scope={"col"}>{sachRes.soLuong}</td>
                                <td scope={"col"}>{sachRes.soTrang}</td>
                                <td scope={"col"}>

                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link  className="dropdown-item" to={`/admin/quan-ly-sach/edit?masach=${sachRes.maSach}`} >Chỉnh Sửa</Link></li>
                                        <li><a className="dropdown-item" href="#">Thêm sửa ảnh</a></li>
                                        <li><a className="dropdown-item" href="#">Xóa</a></li>

                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>


                                </td>

                            </tr>
                        ))

                    }


                    </tbody>
                </table>

            </div>


        </>
    );
}

export default QuanLySach;
