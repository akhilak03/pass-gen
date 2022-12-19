import React from 'react'
import './auth.css'
import {useEffect} from 'react';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import {useSelector,useDispatch} from 'react-redux';
import {userLogin} from '../../../Slices/userSlice'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const Loginn = () => {
  let port = process.env.PORT;

  const {register,handleSubmit,formState:{errors}}=useForm()

  const navigate=useNavigate()

  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user);

  let dispatch=useDispatch();

  const onFormSubmit=(userCredobj)=>{
    console.log(userCredobj);
    dispatch(userLogin(userCredobj));
    axios
    .post(`http://localhost:4000/user/login`, userCredobj)
    .then((response) => {
      //console.log(response)
      alert(response.data.message);
    })
    .catch((error) => alert("something went wrong while login "));
  }
 
  //this has to be excecuted when ever issucces or isError is changed
  useEffect(()=>{
    if(isSuccess){
      navigate("/ViewEvents");     
    }
  },[isSuccess,isError]);

  return (
    <div className='formContainer'>
        <div className='formTitle'>LOGIN</div>
        <div className='formWrapper'>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <input type="username" placeholder="Username" {...register("username", { required: true })}/>
            {/*error validation for username */}
            {errors.username && (
              <p className="text-danger"> *username is required</p>
            )}
            <input type="password" placeholder="password" {...register("password", { required: true })} />
            {errors.password && (
              <p className="text-danger"> *password is required</p>
            )}
            <button className='button' type="submit">LOGIN</button>
            <span>Don't have an account? <a href="/Signup"> Sign Up</a></span>
          </form>
        </div>
    </div>
  )
}

export default Loginn