import {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import set = Reflect.set;

export function useAuth() {
    const [isLogin, setIsLogin] = useState(false);

    const [userName, setUserName] = useState('');

    const token = localStorage.getItem("token");

    useEffect(() => {

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Kiểm tra thời hạn của token;
                const currentDate = new Date();

                const curentNumericDateSecond = Math.round(currentDate.getTime() / 1000);

                // Nếu token hết hạn mà lớn hơn thời gian hiện tại là k đúng thì gọi hàm logout...
                if (!decodedToken.exp ? decodedToken.exp : 0 > curentNumericDateSecond) {
                    logout();
                    setIsLogin(false);
                    setUserName('');
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


    }, [token]);

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