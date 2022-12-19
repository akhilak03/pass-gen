import React, { isValidElement, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../components/Shared/Cards/Card.css'
import './ViewEvents.css'
import {useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button'

function ViewEvents() {

    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
      (state) => state.user
    )

    const navigate = useNavigate();
    let [eventList, setEventList] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:4000/admin/getEvents")
        .then((response) => {
          setEventList(response.data.payload);
        })
        .catch((error) => alert("something went wrong!!"));
    }, []);

    function isValid(element) { return element.author===userObj.username && element.Tlimit>0}
  
  
    return (
      <div className="root1" >
        <div className="body">
          <div className="title1 mt-4"> YOUR EVENTS </div>
          <div className="Card-container">
            {eventList.filter(isValid).map((element, Index) =>
              <div className="Card" key={Index}>
                <img src={element.eventImg} className="card-img-top img-thumbnail" alt="Image unavailable" />
                <h1>{element.username}</h1>
                <h3>Venue: {element.venue}</h3>
                <h3>cost: Rs.{element.TicketCost}/-</h3>
                <h6>"Hurry up!! {element.Tlimit} only remaining"</h6>
                <button href="#" className="btn btn-warning w-100" onClick={()=>{navigate("/Key")}}>
                  EDIT EVENT
                </button>
              </div>  
            )}
          </div>
        </div>
        <center><Button className="button" variant="outline-dark" onClick={()=>{navigate("/Home")}}>BACK TO HOME</Button></center>
      </div>
    )
}

export default ViewEvents