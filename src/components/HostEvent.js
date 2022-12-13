import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../Slices/EventSlice";
import { useDispatch,useSelector} from "react-redux";
import axios from "axios";
import Button from 'react-bootstrap/Button'

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
    <div className="row mt-3">
      <p className="display-1 text-success text-center">Host an Event</p>
      <div className="col-9 col-sm-10 col-md-6 mx-auto mt-3">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* username */}
          <div className="mb-3">
            <label htmlFor="un">Event name</label>
            <input
              type="text"
              id="un"
              className="form-control"
              {...register("username", {
                required: true,
                minLength: 4,
                maxLength: 10,
              })}
            />
            {/* validation error msg for username */}
            {errors.username?.type === "required" && (
              <p className="text-danger">* Username required</p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="text-danger">* Min length should be 4</p>
            )}
            {errors.username?.type === "maxLength" && (
              <p className="text-danger">* Max length should be 10</p>
            )}
          </div>
          {/* email */}
          <div className="mb-3">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              className="form-control"
              {...register("venue", { required: true })}
            />
            {/* validation error msg for email */}
            {errors.venue?.type === "required" && (
              <p className="text-danger">* Location required</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="d">Date</label>
            <input
              type="date"
              id="d"
              className="form-control"
              {...register("d", { required: true })}
            />
            {errors.d?.type === "required" && (
              <p className="text-danger">* Date of event required</p>
            )}
            <label htmlFor="t">Time</label>
            <input
              type="time"
              id="t"
              className="form-control"
              {...register("t", { required: true })}
            />
            {errors.t?.type === "required" && (
              <p className="text-danger">* time is required</p>
            )}

            <div className="mb-3 d-flex flex-start">
              {/* male */}
              <div className="form-check me-2">
                <input
                  type="radio"
                  id="AM"
                  className="form-check-input"
                  {...register("period", { required: true })}
                  value="AM"
                />
                <label htmlFor="AM" className="form-check-label">
                  AM
                </label>
              </div>
              {/* female */}
              <div className="form-check">
                <input
                  type="radio"
                  id="PM"
                  className="form-check-input"
                  {...register("period", { required: true })}
                  value="PM"
                />
                <label htmlFor="PM" className="form-check-label">
                  PM
                </label>
              </div>
              {/* validation error msg for gender */}
              {errors.period?.type === "required" && (
                <p className="text-danger">* This field is required</p>
              )}
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="phno">Mobile number</label>
            <input
              type="number"
              id="phno"
              placeholder="ex : 9999999999"
              className="form-control"
              {...register("phno", { required: true })}
            />
            {/* validation error msg for email */}
            {errors.phno?.type === "required" && (
              <p className="text-danger">* mobile number is required</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="TicketCost">Cost Per Ticket</label>
            <input
              type="number"
              id="TicketCost"
              className="form-control"
              {...register("TicketCost", { required: true })}
            />
            {/* validation error msg for email */}
            {errors.TicketCost?.type === "required" && (
              <p className="text-danger">*Per ticket cost is required</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Tlimit">Estimated no. of attendes</label>
            <input
              type="number"
              id="Tlimit"
              placeholder="ex : 29"
              className="form-control"
              {...register("Tlimit", { required: true })}
            />
            {/* validation error msg for email */}
            {errors.Tlimit?.type === "required" && (
              <p className="text-danger">*this field is required</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Tlimit">KEY</label>
            <input
              type="password"
              id="key"
              className="form-control"
              {...register("key", { required: true })}
            />
            {/* validation error msg for email */}
            {errors.Tlimit?.type === "required" && (
              <p className="text-danger">*this field is required</p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="btn btn-success d-block m-auto mb-4 col-6"
          >
            Submit
          </button>
          <center><Button variant="outline-dark" onClick={()=>{navigate("/Event")}}>
            ViewEvents!</Button></center>
        </form>
      </div>
    </div>
  );
}

export default HostEvent;
