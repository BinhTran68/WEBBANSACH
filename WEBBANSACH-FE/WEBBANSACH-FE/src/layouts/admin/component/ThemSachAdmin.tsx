import React, {FormEvent, useEffect, useState} from "react";
import {baseUrl} from "../../ultils/config";
import {getAllTheLoaiSach} from "../../../api/TheLoai";
import TheLoaiModel from "../../../models/TheLoaiModel";
import NhaXuatBanModel from "../../../models/NhaXuatBanModel";
import {getAllNhaXuatBan} from "../../../api/NhaXuatBanApi";
import {getAllNhaPhatHanh} from "../../../api/NhaPhatHanhApi";
import INhaPhatHanhModel from "../../../models/INhaPhatHanhModel";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FileService from "../../../api/admin/AxiosApiService";
import {toast, ToastContainer} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";
import RequireAdmin from "../RequireAdmin";


const ThemSachAdmin: React.FC<{}> = () => {

    const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoaiModel[]>([]);

    const [danhSachNhaXuatBan, setDanhSachNhaXuatBan] = useState<NhaXuatBanModel[]>([]);

    const [danhSachNhaPhatHanh, setDanhSachNhaPhatHanh] = useState<INhaPhatHanhModel[]>([])

    const [srcImage, setSrcImage] = useState("");

    const [bookImage, setBookImage] = useState<File | Blob | null>(null);

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        getAllTheLoaiSach().then(
            (res) => {
                // @ts-ignore
                return setDanhSachTheLoai(res);
            }
        ).catch(
            (error) => {
               toast.error("Không thể lấy được danh sách thể loại");
            }
        )

    }, [])


    useEffect(() => {
        getAllNhaXuatBan().then(
            (res) => {
                setDanhSachNhaXuatBan(res);
            }
        ).catch(
            (error) => {
                toast.error("Không thể lấy được danh sách nhà xuất bản");
                console.log(error);
            }
        )

    }, []);

    useEffect(() => {
        getAllNhaPhatHanh().then(
            (res) => {
                setDanhSachNhaPhatHanh(res);
            }
        ).catch(
            (error) => {
                toast.error("Không thể lấy được danh sách nhà phát hành");
            }
        )

    }, []);


    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: ' ',
        maTheLoai: [],
        tenTacGia: ' ',
        ISBN: ' ',
        moTa: '',
        hangChinhHang: true,
        nhaPhatHanh: '',
        dichGia: '',
        loaiBia: ' ',
        soTrang: '',
        nhaXuatBan: 0,
        giaNiemYet: '',
        giaBan: '',
        soLuong: ''

    })


    const onChangeSelectNhaXuatBan = (event: React.FormEvent<HTMLSelectElement>) => {
        setSach({...sach, nhaXuatBan: parseInt(event.currentTarget.value)})
    }

    const onChangeNhaPhatHanh = (event: React.FormEvent<HTMLSelectElement>) => {
        setSach({...sach, nhaPhatHanh: (event.currentTarget.value)})
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        setLoading(true);

        const url = `${baseUrl}/api/admin/san-pham/add-sach`;

        const formData = new FormData();

        // @ts-ignore
        formData.append("sachRequest", new Blob([JSON.stringify(sach)], {type: "application/json"}));
        // @ts-ignore
        formData.append("bookImg", bookImage);


        FileService.uploadImage(url, formData).then(
            (res) => {
                if (res.status == 201) {
                    toast.success("Thêm sách thành công");
                    setSach({
                        maSach: 0,
                        tenSach: ' ',
                        maTheLoai: [],
                        tenTacGia: ' ',
                        ISBN: ' ',
                        moTa: '',
                        hangChinhHang: true,
                        nhaPhatHanh: '',
                        dichGia: '',
                        loaiBia: ' ',
                        soTrang: '',
                        nhaXuatBan: 0,
                        giaNiemYet: '',
                        giaBan: '',
                        soLuong: ''
                    })

                } else if (res.status == 401) {

                    toast.error("Phiên đăng nhập đã hết hạn");
                } else {
                    toast.error("Có lỗi xảy ra trong quá trình đăng nhập");
                }
            }
        ).catch(
            (e) => alert(e)
        )

    }

    // const [personName, setPersonName] = React.useState<string[]>([]);
    // // Selected component
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 250,
                width: 250,
            },
        },
    };

    const [listTenTheLoai, setListTenTheLoai] = React.useState<string[]>([]);
    const handleChangeSelectTheLoai = (event: SelectChangeEvent<typeof listTenTheLoai>) => {
        const {
            target: {value},
        } = event;

        setListTenTheLoai(
            typeof value === 'string' ? value.split(',') : value,
        );

        const maTheLoai = [];

        for (const theLoai of value) {
            for (let j = 0; j < danhSachTheLoai.length; j++) {
                if (theLoai == danhSachTheLoai[j].tenTheLoai) {
                    maTheLoai.push(danhSachTheLoai[j].maTheLoai)
                }
            }
        }


        // @ts-ignore
        setSach({...sach, maTheLoai: maTheLoai})
        console.log(maTheLoai);


    };

    const handleFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const value = event.target.files[0];
        if (value) {

            const url = URL.createObjectURL(value);

            setSrcImage(url);
            setBookImage(value);
        }

    }

    if (loading) {
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


    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className={"row"}>
            <div className={"text-center mt-5"}>
                <h2>Thêm sách</h2>
            </div>

            <form className={"col-8 mx-auto"} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input className="form-control"
                           id="exampleFormControlInput"
                           type="hidden"
                           value={sach.maSach}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Tên sách</label>
                    <input className="form-control"
                           type="text"
                           onChange={(event => setSach({...sach, tenSach: event.target.value}))}
                           value={sach.tenSach}
                           required={true}
                    />
                    {/*...sach là giữ nguyên đối tượng sách. Dấu phẩy là để set giá trị cho tên sách*/}
                </div>

                {/* Thể loại sách  */}
                <div className="mb-3">
                    <div>
                        <FormControl className={"form-control"}>
                            <InputLabel id="demo-multiple-checkbox-label"> Thể Loại </InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={listTenTheLoai}
                                onChange={handleChangeSelectTheLoai}
                                input={<OutlinedInput label="Thể Loại"/>}

                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {danhSachTheLoai.map((theLoai) => (
                                    <MenuItem key={theLoai.tenTheLoai} value={theLoai.tenTheLoai}>
                                        <Checkbox checked={listTenTheLoai.indexOf(theLoai.tenTheLoai) > -1}/>
                                        <ListItemText primary={theLoai.tenTheLoai}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/* Nhà xuất bản */}

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Nhà xuất bản</label>
                    <select className="form-select" value={sach.nhaXuatBan} onChange={event => onChangeSelectNhaXuatBan(event)}>
                        <option value={0}>Chọn Nhà xuất bản</option>
                        {
                            danhSachNhaXuatBan.map((nxb) => (
                                <option key={nxb.maNhaXuatBan} value={nxb.maNhaXuatBan}>{nxb.tenNhaXuatBan}</option>
                            ))
                        }
                    </select>
                </div>

                {/* Nhà phát hành*/}

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Nhà phát hành</label>
                    <select className="form-select" value={sach.nhaPhatHanh} onChange={event => onChangeNhaPhatHanh(event)}>
                        <option value={0}>Chọn Nhà Phát Hành</option>
                        {
                            danhSachNhaPhatHanh.map((nph) => (
                                <option key={nph.maNhaPhatHanh} value={nph.maNhaPhatHanh}>{nph.tenNhaPhatHanh}</option>
                            ))
                        }
                    </select>
                </div>


                {/*Tên tác giả */}

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Tên tác giả</label>
                    <input className="form-control"
                           type="text"

                           onChange={(e => setSach({...sach, tenTacGia: e.target.value}))}
                           value={sach.tenTacGia}
                           required={true}
                    />
                </div>

                {/*Set isbn*/}

                <div className="mb-3">
                    <label className="form-label" htmlFor="">ISBN</label>
                    <input className="form-control"
                           type="text"
                           onChange={(e => setSach({...sach, ISBN: e.target.value}))}
                           value={sach.ISBN}
                           required={true}
                    />
                </div>

                {/* mô tả */}

                <div className="mb-0">
                    <label className="form-label" htmlFor="exampleTextarea">Mô tả</label>
                    <textarea
                        className="form-control"
                        value={sach.moTa}
                        onChange={e => setSach({...sach, moTa: e.target.value})}
                    />
                </div>

                {/* Thêm hình ảnh */}

                <div className="mb-3">
                    <div>
                        <label className="form-label" htmlFor="exampleTextarea">Chọn ảnh đại diện cho sách</label>
                        <input onChange={handleFileImage} className="form-control" type="file" id=""/>
                    </div>
                    <div className={""}>
                        <img style={{height: "25rem"}} src={srcImage} alt=""/>

                    </div>


                </div>


                {/* Hàng chính hãng */}
                <div className={"mb-3"}>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                               onChange={event => setSach({...sach, hangChinhHang: !sach.hangChinhHang})}
                               defaultChecked={sach.hangChinhHang}
                        />
                        <label className="form-check-label" htmlFor="">
                            Hàng chính hãng
                        </label>
                    </div>
                </div>


                {/* Dịch giả */}

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Dịch giả</label>
                    <input className="form-control"
                           type="text"
                           onChange={(e => setSach({...sach, dichGia: e.target.value}))}
                           value={sach.dichGia}
                    />
                </div>

                {/*  Loại bìa */}

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Loại Bìa</label>
                    <input className="form-control"
                           type="text"
                           onChange={(e => setSach({...sach, loaiBia: e.target.value}))}
                           value={sach.loaiBia}
                           required={true}
                    />
                </div>

                {/* Số trang   */}

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Số trang</label>
                    <input className="form-control"
                           type="number"
                           defaultValue={NaN}
                           onChange={(e => setSach({...sach, soTrang: e.target.value}))}
                           value={sach.soTrang}
                           required={true}
                    />
                </div>

                {/* nhaXuatBan */}


                <div className="mb-3">
                    <label className="form-label" htmlFor="">Giá Niêm Yết</label>
                    <input className="form-control"
                           type="number"
                           onChange={(e => setSach({...sach, giaNiemYet: (e.target.value)}))}
                           value={sach.giaNiemYet}
                           required={true}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Giá Bán</label>
                    <input className="form-control"
                           type="number"
                           onChange={(e => setSach({...sach, giaBan: (e.target.value)}))}
                           value={sach.giaBan}
                           required={true}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="">Số Lượng</label>
                    <input className="form-control"
                           type="number"
                           onChange={(e => setSach({...sach, soLuong: (e.target.value)}))}
                           value={sach.soLuong}
                           required={true}
                    />
                </div>

                {/* CHỌN THỂ LOẠI  .... */}

                <div className={"text-center my-5"}>
                    <button className={"btn btn-primary"} type={"submit"}>Lưu Sách</button>
                </div>

            </form>

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
    );

}

const SachForm_Admin = RequireAdmin(ThemSachAdmin,  ["ADMIN", "QUAN_LY", "NHAN_VIEN"]);

export default SachForm_Admin;