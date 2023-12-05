import React, {Component, useEffect, useState} from 'react';
import {getSacSachResponseByPage} from "../../../api/admin/GetSachResponse";
import * as url from "url";
import {baseUrl} from "../../ultils/config";
import SachResponseModel from "../../../models/SachResponseModel";
import {Button, Menu, MenuItem, PaginationItem} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";
import {delSachById} from "../../../api/SachAPI";
import {toast, ToastContainer} from 'react-toastify';

const QuanLySach = () => {

    const [sachResponseList, setSachResponseList] = useState<SachResponseModel[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [maSachCanXoa, setMaSachCanXoa] = useState(0);

    const [reLoad, setReload] = useState(false);

    const handlePagination = (event: any, page: number) => {
        setCurrentPage(page);
    }

    const url: string = `${baseUrl}/api/admin/san-pham/get-book-response?pageNumber=${currentPage - 1}&pageSize=10&sortBy=maSach&typeSort=desc`

    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {

        getSacSachResponseByPage(url).then(
            (res) => {

                setTotalPage(res.totalPage)
                return res.result;

            }
        ).then(
            (data) => {
                setSachResponseList(data);
            }
        )

    }, [currentPage, reLoad])


    const handleDelSachById = (maSach: number) => {
        setMaSachCanXoa(maSach);

    }

    const handleDelete = () => {
        const res = delSachById(maSachCanXoa);

        res.then(
            (res) => {
                if (res.status === 204) {
                    setReload(!reLoad);
                    toast.success(' Xóa thành công!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (res.status === 404) {
                    toast.warning('Không tìm thấy sách cần xóa. Vui lòng kiểm tra lại!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error('Thao tác không hợp lệ!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        ).catch(
            (error) => {
                toast.error('Lỗi không xác định. Vui lòng liên hệ nhà phát triển!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        )

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
                                <td style={{wordWrap: "break-word"}} width={"480rem"}
                                    height={"65rem"}>{sachRes.tenSach}</td>
                                <td scope={"col"}>{sachRes.tenTacGia}</td>
                                <td scope={"col"}>
                                    <img src={sachRes.link} height={"69rem"} width={"65rem"} alt=""/>
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
                                        <li><Link className="dropdown-item"
                                                  to={`/admin/quan-ly-sach/edit/${sachRes.maSach}`}>Chỉnh Sửa</Link>
                                        </li>
                                        <li><Link className="dropdown-item"
                                                  to={`/admin/quan-ly-sach/edit-image/${sachRes.maSach}`}>Thêm sửa
                                            ảnh</Link></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item " data-bs-toggle="modal"
                                               data-bs-target="#exampleModal"
                                               onClick={() => handleDelSachById(parseInt(sachRes.maSach))}>Xóa</a></li>
                                    </ul>


                                </td>

                            </tr>
                        ))

                    }


                    </tbody>
                </table>

                <div className={"d-flex justify-content-center"}>
                    <Stack spacing={3}>
                        <Pagination color={"primary"} page={currentPage} onChange={handlePagination} count={totalPage}
                                    size={"large"} showFirstButton showLastButton/>
                    </Stack>

                </div>
                <div>
                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Xác nhận xóa sách</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Bạn chắc chắn ??
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button type="button" onClick={handleDelete} data-bs-dismiss="modal" className="btn btn-primary">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    {/* Same as */}
                    <ToastContainer />
                </div>


            </div>


        </>
    );
}

export default QuanLySach;
