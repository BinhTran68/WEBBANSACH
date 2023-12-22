import {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import set = Reflect.set;
import {useLocation} from "react-router-dom";
import {getToken} from "./config";

export function useAuth() {
    const [isLogin, setIsLogin] = useState(false);

    const [userName, setUserName] = useState('');

    // Nếu
    const token = getToken();


    const location = useLocation();


    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Kiểm tra thời hạn của token;
                const currentDate = new Date();

                const tokenExp = decodedToken.exp;

                const curentNumericDateSecond = Math.round(currentDate.getTime() / 1000);


                // Nếu token hết hạn mà lớn hơn thời gian hiện tại là k đúng thì gọi hàm logout...

                // @ts-ignore
                if (curentNumericDateSecond > tokenExp) {
                    logout();
                    setIsLogin(false);
                    setUserName('');
                    alert("Hết phiên đăng nhập. Vui lòng đăng nhập lại")
                    window.location.assign("/dang-nhap");
                } else {
                    setIsLogin(true);
                    setUserName(decodedToken.sub ? decodedToken.sub : '');
                }
            } catch (e) {
                console.error(e);
                setIsLogin(false);
                setUserName('');
            }
        }

    }, [location]);


    // Hàm này sẽ đăng xuất người dùng và cập nhật trạng thái đăng nhập
    const logout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('token');
        // Cập nhật trạng thái đăng nhập
        setIsLogin(false);
        setUserName('');
    };

    return [isLogin, userName, logout];
}