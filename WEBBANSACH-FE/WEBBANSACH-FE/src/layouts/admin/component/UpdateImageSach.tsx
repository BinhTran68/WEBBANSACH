import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate, useParams} from "react-router-dom";
import IImageModel from "../../../models/IImageModel";
import {getAllImageByIdBook} from "../../../api/ImageAPI";
import "../adminComponent.scss"
import {getBookById} from "../../../api/SachAPI";
import {toast, ToastContainer} from "react-toastify";
import {baseUrl} from "../../ultils/config";
import {Backdrop, CircularProgress} from "@mui/material";
import AxiosApiService from "../../../api/admin/AxiosApiService";
import {log} from "util";


const UpdateImageSach = () => {

    const {maSach} = useParams();

    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<IImageModel[]>([]);


    const [bookName, setBookName] = useState("");

    const [reLoad, setReload] = useState(false);

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);


    const history = useNavigate();


    useEffect(() => {

        getBookById(parseInt(maSach ? maSach : "0")).then(
            (res) => {
                console.log(res);
                if (res == null) {
                    history("/404", {replace: true});
                    return;
                }
                setBookName(res.tenSach ? res.tenSach : "");
            }
        ).catch(
            (e) => {
                history("/404", {replace: true});
            }
        )
    }, [])

    useEffect(() => {
        if (typeof maSach === "string") {
            getAllImageByIdBook(parseInt(maSach)).then(
                (res) => {
                    setDanhSachHinhAnh(res);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                (er) => {
                    alert("có lỗi khi lấy ảnh")
                }
            )
        }

    }, [reLoad])


    const [imageSrc, setImageSrc] = useState([]);
    let imageSrcList: string[] = [];


    useEffect(() => {
        const newBookImages: any[] = [];
        const promises = []; // Khởi tạo một mảng để lưu các promise
        for (let i = 0; i < danhSachHinhAnh.length; i++) {
            const fileName = maSach + "_" + danhSachHinhAnh[i].maHinhAnh
            let urlClient = "";
            // @ts-ignore
            const promise = fetch(danhSachHinhAnh[i].link).then(async response => {
                const contentType = response.headers.get('content-type')
                const blob = await response.blob();
                // @ts-ignore
                const file = new File([blob], fileName, {contentType});
                danhSachHinhAnh[i].file = file;
                urlClient = await URL.createObjectURL(file);
                imageSrcList[i] = urlClient;
            })
            promises.push(promise); // Thêm promise vào mảng
        }
        Promise.all(promises).then(() => { // Đợi tất cả các promise hoàn thành
            // @ts-ignore
            setImageSrc(imageSrcList); // Phải gọi hàm src sau khi các lời gọi hoàn thành
        })
    }, [danhSachHinhAnh]);

    if (dangTaiDuLieu) {
        // @ts-ignore
        return (
            <>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={true}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </>
        )
    }


    const updateImageSrc = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

        if (danhSachHinhAnh[index].maHinhAnh != 0) {
            alert("Không thể cập nhật ảnh cho hình ảnh cũ");
            return;
            ;
        }
        // @ts-ignore
        if (event.target.files.length < 1) {
            alert("Vui lòng chọn tệp cho ảnh");
            return;
        }


        // @ts-ignore
        const value = event.target.files[0];

        const newDanhSachHinhAnh = [...danhSachHinhAnh];

        newDanhSachHinhAnh[index].file = value;
        const urlClient = await URL.createObjectURL(value);
        newDanhSachHinhAnh[index].link = urlClient;
        setDanhSachHinhAnh(newDanhSachHinhAnh)

    };

    const handleAddNewImage = () => {
        const imageModel = {
            maHinhAnh: 0,
            tenHinhAnh: "none",
            link: "none",
            file: undefined
        }

        setDanhSachHinhAnh([...danhSachHinhAnh, imageModel]);

    }


    const handleChangImageBook = () => {
        setDangTaiDuLieu(true);
        let count = 0;
       const newDanhSachHinhAnh = danhSachHinhAnh.filter((img)=> {
            // @ts-ignore
            return !img.link.startsWith("http://res.cloudinary.com");
        })
        setDanhSachHinhAnh(newDanhSachHinhAnh);
       setDangTaiDuLieu(true);
        if (danhSachHinhAnh.length === 0) {
            return;
        }
        const formData = new FormData();

        for (let i = 0; i < danhSachHinhAnh.length; i++) {
            let img = danhSachHinhAnh[i];
            // @ts-ignore
            if (img.file?.size < 40000) {
                alert("Vui lòng chọn image hoặc image có kích thước lớn hơn 40kb");
                setReload(!reLoad);
                return;
            }
            // @ts-ignore
            formData.append(`files`, img.file);
        }

        console.log("Vẫn chạy xuống đây");
        const idHinhAnh: number[] = [];


        danhSachHinhAnh.forEach((image, index) => {
            idHinhAnh[index] = danhSachHinhAnh[index].maHinhAnh;
        })

        // @ts-ignore
        formData.append('idImage', new Blob([JSON.stringify(idHinhAnh)], {type: "application/json"}));

        const url = `http://localhost:8080/api/admin/hinh-anh/update-hinh-anh?maSach=${maSach}`;

        // @ts-ignore
        AxiosApiService.postApiFormDataAndAuthor(url, formData).then(
            (res) => {
                if (res.status == 200) {
                    alert("Lưu thay đổi thành công");
                    setReload(!reLoad);
                    setDangTaiDuLieu(false);
                }
            }
        ).catch(err => {
            if (err.response.status === 401) {

                alert("Bạn không có quyền thực hiện hành động này. Vui lòng đăng nhập bằng tài khoản có quyền thực thiện hành động trên");

                setDangTaiDuLieu(false);
                return;
            }
            if (err.response.status === 404) {
                alert("Tài nguyên đã bị xóa hoặc không còn tồn tại");
                setDangTaiDuLieu(false);
                return;
            }
            alert("Có lỗi xảy ra trong quá trình lưu hình ảnh ")
            setDangTaiDuLieu(false);
        })
    }

    const hanleDelImage = (index: number) => {

        if (danhSachHinhAnh[index].icon == true) {
            alert("Không thể xóa hình này");
            return;
        }
        if (danhSachHinhAnh.length === 1) {
            alert("Không thể xóa hình ảnh sách duy nhất");
            return;
        }

        if (danhSachHinhAnh[index].maHinhAnh == 0) {
            const newDanhSachHinhAnh = [...danhSachHinhAnh];
            if (newDanhSachHinhAnh.length > 1) {
                newDanhSachHinhAnh.splice(index);
                setDanhSachHinhAnh(newDanhSachHinhAnh);
            } else {
                alert("Vui lòng thêm 1 hình ảnh trước khi xóa hình ảnh này");
            }
        } else {
            // Nếu mà hình ảnh đã lưu xuống database thì call api để xóa.
            const url = `${baseUrl}/api/admin/hinh-anh/del-by-id?maHinhAnh=${danhSachHinhAnh[index].maHinhAnh}`
            AxiosApiService.deleteApiWithAxios(url).then(
                (res) => {
                    if (res.status === 204) {
                        toast.success("Xóa thành công");
                        setReload(!reLoad);
                        return;
                    }
                }
            ).catch(
                (e) => {
                    if (e.response.status === 404) {
                        alert("Hình ảnh không còn tồn tại");
                    } else {
                        toast.error("Có lỗi xảy ra vui lòng đăng nhập lại")
                    }
                }
            )

        }
    }

    return (
        <div className={"mt-5"}>
            <div className={"text-center mb-5"}>
                <h1>Thêm Sửa Hình Anh</h1>
                <hr/>
                <h5>{bookName}</h5>
            </div>
            <div className={"row"}>
                {danhSachHinhAnh.map((image, index) => (
                    <div className={"col-md-3 mb-5"}>
                        <div className={"d-flex flex-column text-center align-items-center overflow-hidden"}>
                            <img src={imageSrc[index]} width={"350rem"} height={"380rem"} alt=""/>
                            <hr/>
                            <div className="mb-0">

                                <input
                                    type={"file"}
                                    readOnly={image.maHinhAnh != 0 ? false : true}
                                    onChange={(event) => updateImageSrc(event, index)}
                                    className="form-control"

                                    style={{
                                        width: "100%",
                                        resize: "none",
                                    }}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Tên Hình Ảnh</span>
                                </div>
                                <input type="text" value={image.tenHinhAnh} readOnly={false}
                                       aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Url Hình Ảnh</span>
                                </div>
                                <input type="text" value={image.link} className="form-control"
                                       placeholder="URL Hình Ảnh"
                                       aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                            <div>
                                <button type="button" onClick={(event => hanleDelImage(index))}
                                        className="btn btn-outline-warning">Xóa
                                </button>
                            </div>

                        </div>

                    </div>

                ))}


                {/*  Nút thêm hình ảnh */}
                <div className={"d-flex align-items-center justify-content-center"}>
                    <div className={"text-center my-4 me-5"}>
                        <button type="button" onClick={handleChangImageBook} className="btn btn-primary">Lưu thay đổi
                        </button>
                    </div>

                    <div className={"text-center my-3 me-5"}>
                        <button className={"btn btn-primary"} onClick={handleAddNewImage}>
                            Thêm 1 đối tượng sách
                        </button>
                    </div>

                    <div className={"text-center my-3 me-5"}>
                        <button className={"btn btn-primary"} onClick={handleAddNewImage}>
                            Lưu Hình Ảnh
                        </button>
                    </div>

                </div>

            </div>

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
            <ToastContainer/>

        </div>
    );
}


export default UpdateImageSach;