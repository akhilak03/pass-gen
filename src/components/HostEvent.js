import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../Slices/EventSlice";
import { useDispatch,useSelector} from "react-redux";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import '../components/Shared/auth/auth.css'
import './Login.css'

function HostEvent() {
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  //form submission
  const onFormSubmit = (userData) => {
    
    userData.author=userObj.username
    console.log(userData)
    let f=false
    
    axios
      .post("http://localhost:4000/admin/CreateProducts", userData)
      .then((response) => {
        if(response.data.message==1){
          
          alert("Event has been created succesfully!!")
          navigate("/Event");
          
        }
        else{alert(response.data.message);}
        
      })
      .catch((error) => alert("something went wrong!!"));
      
   
  };

  return (
    <div className="root">
    <div className="formContainer">
        <div className="formWrapper">
            <span className="formTitle">HOST AN EVENT</span>   
            <span className="h5 pt-1">Enter event details</span>   

            <form onSubmit={handleSubmit(onFormSubmit)}>

            <span className="w-100">
              <input type="text" placeholder="Event Name" className="form-control" {...register("username", {   required: true,   minLength: 4,   maxLength: 10, })}
              />
              {errors.username?.type === "required" && (
                <p className="text-danger">* Username required</p>
              )}
              {errors.username?.type === "minLength" && (
                <p className="text-danger">* Min length should be 4</p>
              )}
              {errors.username?.type === "maxLength" && (
                <p className="text-danger">* Max length should be 10</p>
              )}
            </span>
            
            <span className="w-100">
              <input  type="text"  placeholder="Venue"  className="form-control"  {...register("venue", { required: true })}/>
              {errors.venue?.type === "required" && (
                <p className="text-danger">* Location required</p>
              )}
            </span>
            
            <span className="w-100">
              <input  type="date"  id="d"  className="form-control"  {...register("d", { required: true })}/>
              {errors.d?.type === "required" && (
                <p className="text-danger">* Date of event required</p>
              )}
            </span>

            <span className="w-100">
              <input  type="time"  id="t"  className="form-control"  {...register("t", { required: true })}/>
              {errors.t?.type === "required" && (
                <p className="text-danger">* time is required</p>
              )}
            </span>

            <span> 
             <span className="m-5">
              <input  type="radio"  id="AM"  className="form-check-input"  {...register("period", { required: true })}  value="AM"/>
              <label htmlFor="AM" className="form-check-label">AM</label>
             </span>
             
             <span>
              <input  type="radio"  id="PM"  className="form-check-input"  {...register("period", { required: true })}  value="PM"/>
              <label htmlFor="PM" className="form-check-label">PM</label>
             </span>
             {errors.period?.type === "required" && (<p className="text-danger">* This field is required</p>)}
            </span>

            <span className="w-100">
              <input  type="number"  id="phno"  placeholder="Mobile Number"  className="form-control"  {...register("phno", { required: true })}/>
              {errors.phno?.type === "required" && (
                <p className="text-danger">* mobile number is required</p>
              )}
            </span>

            <span className="w-100">
              <input  type="number"  placeholder="Ticket Cost"  className="form-control"  {...register("TicketCost", { required: true })}/>
              {errors.TicketCost?.type === "required" && (
                <p className="text-danger">*Per ticket cost is required</p>
              )}
            </span>

            <span className="w-100">
              <input  type="number"  id=""  placeholder="Estimated no. of attendes"  className="form-control"  {...register("Tlimit", { required: true })}/>
              {errors.Tlimit?.type === "required" && (
                <p className="text-danger">*this field is required</p>
              )}
            </span>

            <span className="w-100">
              <input  type="password"  placeholder="Key/Password to access event details"  className="form-control"  {...register("key", { required: true })}/>
              {errors.Tlimit?.type === "required" && (
                <p className="text-danger">*this field is required</p>
              )}
            </span>

            <button className="button" type="submit" >Create event !!!!</button>
            <Button className="button" variant="outline-dark" onClick={()=>{navigate("/Event")}}>View all Events!</Button>
            </form>          

            
        </div>
    </div>
    </div>
    // <>
    // <Card/>
    // </>
  );
}

export default HostEvent;