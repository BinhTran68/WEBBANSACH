import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {baseUrl} from "../ultils/config";
import {message} from "antd";
import {jwtDecode} from "jwt-decode";
import RequireAdmin, {JwtPayLoad} from "../admin/RequireAdmin";
import {LiaObjectGroup} from "react-icons/lia";

const DangNhap = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState(true);

    const navigate = useNavigate(); // Lấy hàm navigate






    const handleLogin = async () => {


        if (username.trim() == "") {
            setStatusMessage(false);

            setMessage("Tên tài khoản không được để trống");
            return;
        }
        if (password.trim() == "") {
            setStatusMessage(false);
            setMessage("Mật khẩu không được để trống");
            return;
        }

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
            (res) => {
                if (res.ok) {
                    setStatusMessage(true);
                    setMessage("Đăng nhập thành công");
                    return res.json();
                } else {
                    setStatusMessage(false);
                    setMessage("Đăng nhập không thành công. Vui lòng kiểm tra tài khoản mật khẩu")
                }

            }
        ).then(
            (data) => {
                const {jwt} = data;
                localStorage.setItem("token", jwt);

                const jwtDecoded = jwtDecode(jwt) as JwtPayLoad;
                const roles = jwtDecoded.roles;
                if (roles.includes("USER") && roles.length == 1) {
                    navigate(-1);
                }else {
                    window.location.assign("/admin");
                }
            }
        ).catch((error) => {
            setStatusMessage(false);
            setMessage("Đăng nhập không thành công. Vui lòng kiểm tra tài khoản mật khẩu")
        })

    }

    return (
        <div className={"container"}>

            <div className='row justify-content-center align-items-center mt-3'>
                <form className='col-md-3'>
                    <div>
                        <h3 className="mb-2">Xin Chào, </h3>
                        <p>Đăng nhập hoặc <Link className={"link-router-items"} to={"/dangky"}>Tạo tài khoản</Link></p>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text"
                               id="username"
                               className="form-control"
                               value={username}
                               onKeyDown={event => event.key === 'Enter' && handleLogin()}
                               onChange={e => setUsername(e.target.value)}
                        />
                        <label className="form-label">Tên Đăng Nhập</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2"
                               className="form-control"
                               onKeyDown={event => event.key === 'Enter' && handleLogin()}
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                        />

                        <label className="form-label">Mật khẩu</label>
                    </div>


                    <div className="d-flex justify-content-between mb-4">
                        <div className="d-flex justify-content-around">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"

                                       value="" id="form2Example31"/>

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
                                className="btn btn-danger  mb-4 ">Đăng nhập
                        </button>

                        <div style={statusMessage ? {color: "green"} : {color: "red"}}>{message}</div>


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
        </div>


    )
}

export default DangNhap
