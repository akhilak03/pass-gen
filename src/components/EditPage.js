import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../Slices/EventSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { Component } from "react";
function EditPage() {
  const { state } = useLocation();
  console.log(state)
  let sam=state
  
  
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  //form submission
  const onFormSubmit = (userData) => {
    let sample={...sam,...userData}
    console.log(sample)

    

    axios
      .post("http://localhost:4000/admin/UpdateEvent", sample)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => alert("something went wrong!!"));
    navigate("/Event");
  };
  const onFormSubmit1 = () => {
    

    
   let del=state.username
   console.log(del)
    axios
      .delete(`http://localhost:4000/admin/deleteEvent/${del}` )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => alert("something went wrong!!"));
    navigate("/Event");
  };

  return (
    <div className="row mt-3  ">
      <p className="display-1 text-success text-center ">EDIT EVENT</p>
      <div className="col-9 col-sm-10 col-md-6 mx-auto mb-3 p-5 shadow-lg  bg-white rounded">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* username */}
          
          {/* email */}
          <div className="mb-3">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              defaultValue={state.venue}
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
              defaultValue={sam.d}
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
              defaultValue={sam.t}
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
                 defaultValue={sam.period}
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
                  defaultValue={sam.period}
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
              defaultValue={sam.phno}
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
              defaultValue={sam.TicketCost}
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
              defaultValue={sam.Tlimit}
              className="form-control"
              {...register("Tlimit", { required: true })}
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
            Save changes
          </button>
          
          
        </form>
        <button  type="submit"
            className="btn btn-danger d-block m-auto mb-4 col-6" onClick={onFormSubmit1}> delete Event</button>
       
      </div>
    </div>
  );
}

export default EditPage;
