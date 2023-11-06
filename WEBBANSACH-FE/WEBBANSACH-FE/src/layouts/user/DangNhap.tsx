import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {baseUrl} from "../ultils/config";

const DangNhap = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleLogin = () => {

        const loginRequest = {
            username: username,
            password: password
        };

        const url = `${baseUrl}/api/account/login`

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        }).then(


        )

    }

    return (

        <div className='d-flex justify-content-center align-items-center mt-3'>
            <form className='w-25'>
                <div>
                    <h3 className="mb-2">Xin Chào, </h3>
                    <p>Đăng nhập hoặc <Link className={"link-router-items"} to={"/dangky"}>Tạo tài khoản</Link></p>
                </div>

                <div className="form-outline mb-4">
                    <input type="text"
                           id="username"
                           className="form-control"
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                    />
                    <label className="form-label">Tên Đăng Nhập</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2"
                           className="form-control"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                    />

                    <label className="form-label">Mật khẩu</label>
                </div>


                <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex justify-content-around">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31"/>
                            <label className="form-check-label"> Remember me </label>
                        </div>


                    </div>

                    <div className="">

                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <div className="text-center">

                    <button type="button"
                            onClick={handleLogin}
                            className="btn btn-danger btn-block mb-4 w-25">Sign in
                    </button>


                </div>
                <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button>
                </div>
            </form>


        </div>
    )
}

export default DangNhap
