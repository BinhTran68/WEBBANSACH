import React, {FormEvent, useEffect, useState} from "react";
import {baseUrl} from "../../ultils/config";
import {getAllTheLoaiSach, getAllTheLoaiSachById} from "../../../api/TheLoai";
import TheLoaiModel from "../../../models/TheLoaiModel";
import NhaXuatBanModel from "../../../models/NhaXuatBanModel";
import {getAllNhaXuatBan, getNhaXuatBanByMaSach} from "../../../api/NhaXuatBanApi";
import {getAllNhaPhatHanh, getAllNhaPhatHanhByIdSach} from "../../../api/NhaPhatHanhApi";
import INhaPhatHanhModel from "../../../models/INhaPhatHanhModel";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {useParams} from "react-router-dom";
import {getBookById} from "../../../api/SachAPI";
import { ToastContainer, toast } from 'react-toastify';



const UpdateSachAdmin: React.FC<{}> = ({}) => {

    const {maSach} = useParams();


    const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoaiModel[]>([]);
    const [danhSachNhaXuatBan, setDanhSachNhaXuatBan] = useState<NhaXuatBanModel[]>([]);
    const [danhSachNhaPhatHanh, setDanhSachNhaPhatHanh] = useState<INhaPhatHanhModel[]>([])


    useEffect(() => {
        if (typeof maSach === "string") {
            getBookById(parseInt(maSach)).then(
                (res) => {
                    // @ts-ignore
                    setSach(res);
                }
            ).catch(
                (error) => {
                    alert("Có lỗi xảy ra")
                }
            )
        }
    }, [])

    useEffect(() => {
        getNhaXuatBanByMaSach(maSach).then(
            (res) => {
                setSach((prevSach) => ({...prevSach, nhaXuatBan: res.maNhaXuatBan}))
            }
        ).catch(
            (error) => {
                alert("Có lỗi xảy ra ở nxb")
            }
        )

    }, [maSach])


    useEffect(() => {
        getAllTheLoaiSachById(maSach).then(
            (res) => {
                const listTenTheLoaiCurrentBook = [];
                const listIdTheLoai: number[] = [];

                for (const re of res) {
                    listTenTheLoaiCurrentBook.push(re.tenTheLoai);
                    listIdTheLoai.push(re.maTheLoai);
                }
                setListTenTheLoai(listTenTheLoaiCurrentBook);

                // @ts-ignore
                setSach((prevState => ({...prevState, maTheLoai: listIdTheLoai})))

            }
        ).catch(
            (error) => {
                toast.warning("Vui lòng cập nhật Thể Loại");
            }
        )

    }, [])


    useEffect(() => {
        getAllNhaPhatHanhByIdSach(maSach).then(
            (res) => {
                setSach((prevSach) => ({...prevSach, nhaPhatHanh: res.maNhaPhatHanh}))
            }
        ).catch(
            (error) => {
                // alert("abc")
                toast.warning("Vui lòng cập nhật nhà phát hành");
            }
        )

    }, [maSach])


    useEffect(() => {
        getAllTheLoaiSach().then(
            (res) => {
                // @ts-ignore
                return setDanhSachTheLoai(res);
            }
        ).catch(
            (error) => {
                alert("Có lỗi xảy ra")
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
                alert("Có lỗi xảy ra")
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
                alert("Có lỗi xảy ra")
            }
        )

    }, []);


    let [sach, setSach] = useState({
        maSach: 0,
        tenSach: ' ',
        maTheLoai: [],
        tenTacGia: ' ',
        isbn: ' ',
        moTa: '',
        hinhAnhBase64: '',
        hangChinhHang: true,
        nhaPhatHanh: 0,
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
        // @ts-ignore
        setSach({...sach, nhaPhatHanh: (event.currentTarget.value)})
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(sach);


        const token = localStorage.getItem('token'); //N lấy token trên localStorage
        const url = `${baseUrl}/api/admin/san-pham/update-sach`
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify(sach) // gan sách vao body
        }).then(
            (res) => {
                if (res.status === 200) {
                    alert("Cập nhật sách thành công");
                }else if (res.status === 201) {
                    alert("Đã thêm sách thành công");

                    setSach({
                        maSach: 0,
                        tenSach: ' ',
                        maTheLoai: [],
                        tenTacGia: ' ',
                        isbn: ' ',
                        moTa: '',
                        hinhAnhBase64: '',
                        hangChinhHang: true,
                        nhaPhatHanh: 0,
                        dichGia: '',
                        loaiBia: ' ',
                        soTrang: '',
                        nhaXuatBan: 0,
                        giaNiemYet: '',
                        giaBan: '',
                        soLuong: ''
                    })
                    // Sau khi theem thanh công set quyển sách về rỗng
                } else if (res.status == 401) {
                    alert("Bạn không có quyền đăng nhập")
                } else {
                    alert("gặp lỗi trong quá trình thêm sách")
                }
            }
        ).catch((e) => {
            alert("Gặp lỗi trong quá trình đăng nhập")
        })
    }


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
                    <select className="form-select" value={sach.nhaXuatBan}
                            onChange={event => onChangeSelectNhaXuatBan(event)}>
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
                           onChange={(e => setSach({...sach, isbn: e.target.value}))}
                           value={sach.isbn}
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

                <div className={"mb-3 mt-3"}>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                               onChange={event => setSach({...sach, hangChinhHang: !sach.hangChinhHang})}
                               checked={sach.hangChinhHang}

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

export default UpdateSachAdmin;