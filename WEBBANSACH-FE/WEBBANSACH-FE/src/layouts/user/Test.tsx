import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";


const Test = () => {

    const [username, setUsername] = useState('');

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            const userData = jwtDecode(token);
            console.log(userData);

            if (userData) {
                setUsername(userData.sub + '');
            }
        }

    }, [])


    return (
        <div className='d-flex justify-content-center'>
            {
                username&& <div>Xin chào, {username}</div>
            }

        </div>

    )
}

export default Test


