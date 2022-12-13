import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ViewEvents.css'
function ViewEvents() {
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
  
  
    return (
      <>
        <div>
          <div className="container-fluid mt-3 row">
            {eventList.map((element, Index) =>
              <div className=" col-4 mx-auto" key={Index} >
                <div className=" card mx-auto mt-2">
                <img src=".." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h4 className="card-title">{element.username}</h4>
                  <h6 className="card-text">
                    Venue:{element.venue}
                    <br />
                    Ticket Price:{element.TicketCost}
                    <br />
                    "Hurry up!!  only {element.Tlimit} remaining"
                  </h6>
                  <button href="#" className="btn btn-primary "onClick={()=>{navigate("/Paypal",{state:{element}})}}>
           Buy Ticket
          </button>
                  </div>
                </div>
              </div>
            )}
          </div>
  
        </div>
      </>
    )
}

export default ViewEvents