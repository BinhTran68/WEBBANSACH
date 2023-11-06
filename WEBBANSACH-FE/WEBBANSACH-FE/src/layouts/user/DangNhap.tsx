import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';

const DangNhap = () => {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };


  return (

    <div className='d-flex justify-content-center align-items-center'>
      <form className='w-50'>
        <div className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control" />
          <label className="form-label" >Email address</label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control" />
          <label className="form-label">Password</label>
        </div>


        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex justify-content-around">

            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
              <label className="form-check-label" > Remember me </label>
            </div>


          </div>

          <div className="">

            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <div className="text-center">
          <button type="button" className="btn btn-danger btn-block mb-4">Sign in</button>
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
