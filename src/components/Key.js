import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useForm } from "react-hook-form";
import EditPage from "./EditPage"
import { useNavigate } from 'react-router-dom';

function Key() {
    let editEvent;
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm()
    const onFormSubmit=(userKey)=>{
        console.log(userKey)
        axios
        .post("http://localhost:4000/admin/findEvent", userKey)
        .then((response) => {
          //console.log(response)
          
          
          if(response.data.message===1){
            editEvent=response.data.payload
            alert("plz wait to edit....")
            navigate("/EditPage",{state:editEvent});
          }
          else{
            alert(response.data.message)
          }
          
           
          
        })
        .catch((error) => alert("something went wrong!! "));
        
        
    }


    return (
        <div>
            <Form onSubmit={handleSubmit(onFormSubmit)}>

                <Form.Group className="mb-3" controlId="formBasicPassword">
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
                    <Form.Label>Secret Key</Form.Label>
                    <Form.Control type="password"
            placeholder="enter secret key"
            {...register("key", { required: true })} />
            {errors.password && (
            <p className="text-danger"> *Secret Key is required</p>
          )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Key