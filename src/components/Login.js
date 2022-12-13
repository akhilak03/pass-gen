import React from 'react';
import {useEffect} from 'react';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import {useSelector,useDispatch} from 'react-redux';
import {userLogin} from '../Slices/userSlice'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { FcRight } from "react-icons/fc";
import login from "../images/lg.svg"

function Login() {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const navigate=useNavigate()
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user);
  let dispatch=useDispatch();
  const onFormSubmit=(userCredobj)=>{
    dispatch(userLogin(userCredobj));
    axios
    .post("http://localhost:4000/user/login", userCredobj)
    .then((response) => {
      //console.log(response)
      alert(response.data.message);
    })
    .catch((error) => alert("something went wrong while login "));
     

  }
 
  //this has to be excecuted when ever issucces or isError is changed
  useEffect(()=>{
    if(isSuccess){
      navigate("/Home");     
    }
  },[isSuccess,isError]);
  return (
    <>
     <>
    <div>
      <div className="display-2 text-center text-dark m-3">
        Login Form
      </div>
      <img src={login} alt="login image" width="300px" className='d-block mx-auto border border-2 border-light p-3 m-3'/>
      <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter Username"
            {...register("username", { required: true })}
          />
          {/*error validation for username */}
          {errors.username && (
            <p className="text-danger"> *username is required</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-danger"> *password is required</p>
          )}
        </Form.Group>
        

        <Button variant="primary" type="submit">
          Login<BiLogIn />
        </Button>
      </Form>
    </div>
    <div className='d-flex justify-content-center'>
      <h5>Need an account... <FcRight /></h5>
      <a href="/Signup" className='button'> Sign Up</a>
    </div>
    </>
    </>

  )
}

export default Login