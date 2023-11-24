import React, {Component, useEffect, useState} from 'react';
import {getSacSachResponseByPage} from "../../../api/admin/GetSachResponse";
import * as url from "url";
import {baseUrl} from "../../ultils/config";
import SachResponseModel from "../../../models/SachResponseModel";
import {Button, Menu, MenuItem, PaginationItem} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";

const QuanLySach = () => {

    const [sachResponseList, setSachResponseList] = useState<SachResponseModel[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePagination = (event: any, page: number) => {
        setCurrentPage(page);
    }


    const url: string = `${baseUrl}/api/admin/san-pham/get-book-response?pageNumber=${currentPage-1}&pageSize=10&sortBy=maSach&typeSort=desc`

    const  [totalPage, setTotalPage] = useState(0);
    useEffect(() => {

        getSacSachResponseByPage(url).then(
            (res) => {
                console.log(res);
                setTotalPage(res.totalPage)
                return res.result;

            }
        ).then(
            (data) => {
                setSachResponseList(data);
            }
        )

    }, [currentPage])




    const  handleDelSachById =  (props:number) => {
        // Call api xóa sách

    }

    // @ts-ignore
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
                            <tr className={"text-center "}>
                                <td scope={"col table-admin-column"}>{sachRes.maSach}</td>
                                <td style={{wordWrap: "break-word"}} width={"480rem"} height={"65rem"}>{sachRes.tenSach}</td>
                                <td scope={"col"}>{sachRes.tenTacGia}</td>
                                <td scope={"col"}>
                                    <img src={sachRes.hinhAnhBase64} height={"69rem"} width={"65rem"} alt=""/>
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
                                        <li><Link  className="dropdown-item" to={`/admin/quan-ly-sach/edit/${sachRes.maSach}`} >Chỉnh Sửa</Link></li>
                                        <li><Link className="dropdown-item" to={`/admin/quan-ly-sach/edit-image/${sachRes.maSach}`}>Thêm sửa ảnh</Link></li>
                                        <li><a className="dropdown-item" >Xóa</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" onClick={() => handleDelSachById(parseInt(sachRes.maSach))} >Something else here</a></li>
                                    </ul>


                                </td>

                            </tr>
                        ))

                    }


                    </tbody>
                </table>

                <div className={"d-flex justify-content-center"}>
                    <Stack spacing={3}>
                        <Pagination color={"primary"} page={currentPage} onChange={handlePagination}  count={totalPage} size={"large"} showFirstButton showLastButton />
                    </Stack>

                    {/*<Stack spacing={3}>*/}
                    {/*    <Pagination color={"primary"} count={10} size={"large"} showFirstButton showLastButton renderItem={(item) => (*/}
                    {/*        <PaginationItem components={{ first: (props) => <button className={""} {...props}>Đầu tiên</button>, last: (props) => <button {...props}>Cuối cùng</button>, }} {...item} /> )} />*/}
                    {/*</Stack>*/}

                </div>


            </div>


        </>
    );
}

export default QuanLySach;
