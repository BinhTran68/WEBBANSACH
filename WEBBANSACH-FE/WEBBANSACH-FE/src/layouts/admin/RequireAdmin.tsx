

import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../ultils/config';
export interface JwtPayLoad {
   roles:string[]
}


const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>, roles:string[]) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();
        useEffect(() => {
            const token = getToken();
            // Trong tình huống chưa đăng nhập
            console.log(token);
            
            if (!token) {
                navigate("/dang-nhap");
                return;
            } else {
                // Giải mã token
                const decodedToken = jwtDecode(token) as JwtPayLoad ;
                const userRoles = decodedToken.roles;
                if (!roles.some(role => userRoles.includes(role))) {
                    navigate("/bao-loi-403");
                    return;
                }
            }
        }, [navigate,roles]);
        return <WrappedComponent {...props} />
    }
    return WithAdminCheck;
}


export default RequireAdmin;

