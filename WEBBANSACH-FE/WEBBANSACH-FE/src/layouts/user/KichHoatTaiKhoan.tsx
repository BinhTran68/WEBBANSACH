import { useState, useEffect } from 'react'
import { baseUrl } from '../ultils/config';
import { Link, useParams } from "react-router-dom";


const KichHoatTaiKhoan = () => {
    const { email } = useParams();
    const { maKichHoat } = useParams();
    const [isActive, setIsActive] = useState(false);
    const [thongBao, setThongBao] = useState("");

    useEffect(() => {
        console.log(email);
        console.log(maKichHoat);


        if (email && maKichHoat) {
            handlerActive();
        }



    }, []);

    const handlerActive = async () => {
        try {
            const url = `${baseUrl}/api/account/activated?email=${email}&activationCode=${maKichHoat}`
            const res = await fetch(url, {
                method: "GET"
            });
            if (res.ok) {
                setIsActive(true);
            } else {
                const json = await res.json();
                setThongBao(json.message);
                console.log(res);

            }

        } catch (error) {
            console.log(error);

        }
    }



    return (
        <div className='d-flex justify-content-center'>
            <div className=''>
                <h1>Kích hoạt tài khoản</h1>
                {
                    isActive
                        ? 
                        <div>
                            <p>Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục dịch vụ</p>
                            <Link to={"/"}>Trang chủ</Link>
                        </div>
                    
                        : (
                        <div>
                             <p>{thongBao}</p>
                             <Link to={"/"}>Trang chủ</Link>
                        </div>
                       )
                }


            </div>

        </div>

    )
}

export default KichHoatTaiKhoan
