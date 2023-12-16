import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


const Baner = () => {
    return (
        <div className="p-2 mb-2 bg-warning-subtle text-danger">
            <div className="container-fluid py-5 text-white d-flex
                justify-content-center align-items-center" >
                <div>
                    <h3 className="display-5 text-danger fw-bold">
                        Đọc sách chính là hộ chiếu <br/> cho vô số cuộc phiêu lưu
                    </h3>
                    <p className="">Mary Pope Osborne</p>
                    <Link to={"/san-phams"} className="btn btn-warning btn-lg text-white float-end">Khám phá sách tại Fahasa.vn</Link>
                </div>
            </div>
        </div>
    );
};

Baner.propTypes = {

};

export default Baner;