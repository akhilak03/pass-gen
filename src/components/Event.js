import React, { useEffect, useState } from "react";
import axios from "axios";
import './Event.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {MdDeleteForever} from 'react-icons/md'
import {useSelector} from 'react-redux'
function Event() {
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
  
 

  return (
    <>
      <div>
        <div className="container-fluid mt-3 row">
          {eventList.map((element, Index) =>
            <div className=" col-4 mx-auto" key={Index} >
              <div className=" card mx-auto mt-2">
              <img src=".." className="card-img-top" alt="..." />
              {
                element.author===userObj.username &&
                  <MdDeleteForever onClick={()=>{navigate('/EditPage',{state:{element}})}} className='icon-delete' color='red' size={30}/>
              }
              <div className="card-body">
                <h4 className="card-title">{element.username}</h4>
                <h6 className="card-text">
                  Venue:{element.venue}
                  <br />
                  Ticket Price:{element.TicketCost}
                  <br />
                  "Hurry up!!  only {element.Tlimit} remaining"
                </h6>
                <Button variant="outline-warning" onClick={()=>{navigate("/Key")}}>EDIT/UPDATE</Button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default Event;
