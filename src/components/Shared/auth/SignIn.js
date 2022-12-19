import React,{ useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from "axios";
import './auth.css'
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //state for image
  let [img,setImg]=useState(null);
  //on img selecct
  const onImageSelect=(event)=>{
    console.log(event); 
    setImg(event.target.files[0]);
  }
  const onFormSubmit = (userobj) => { 
    let formData=new FormData();
    formData.append("userObj",JSON.stringify(userobj));
    formData.append("photo",img)
    axios
      .post("http://localhost:4000/user/create-user", formData)
      .then((response) => { 
        //console.log(response)
        alert(response.data.message);
        if (response.data.message === "new user Created!!") {
          navigate("/login");
        } 
      })
      .catch((error) => alert("something went wrong in creating user"));
  };
  const navigate = useNavigate();

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="formTitle">SIGN UP</span>   

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input type="text" placeholder='Username' {...register("username", { required: true })}/>
                {errors.username && ( 
                  <p className="text-danger"> *username is required</p> 
                )}

                <input type="password" placeholder="Password" {...register("password", { required: true })}/>
                {errors.password && (<p className="text-danger"> *password is required</p>)}

                <input type="email" placeholder='Email Id' {...register("email", { required: true })} />

                <input type="text" placeholder="Enter City" {...register("password", { required: true })}/>
                {errors.city && <p className="text-danger"> *city is required</p>}

                <label class="custom-file-upload">
                  <input type="file" {...register("photo", { required: true })} onChange={(event)=>onImageSelect(event)}/>
                  Upload profile Picture
                </label>
                {errors.photo && <p className="text-danger"> *photo is required</p>}

                <button className='button' type='submit'>Sign Up</button>
                <span>ALready have an account? <a href="/Login"> Login</a></span>
            </form>          
        </div>
    </div>
  )
}

export default SignIn