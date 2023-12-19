import {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';

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
                if (decodedToken.exp ? decodedToken.exp : 0 < currentDate.getTime()) {
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
        setUserName('');
    };

    return [isLogin, userName, logout];
}