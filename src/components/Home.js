import React from "react";
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Home() {
    const navigate=useNavigate();
    return (
        <>
            <div className="Parent">
                <div className="child1">
                    <h1>BUY</h1>
                    <center>
                    <Button variant="outline-dark" onClick={()=>{navigate("/ViewEvents")}}>Buy the tickets!</Button>
                    </center>
                </div>
                <div className="child2">
                    <h1>HOST</h1>
                    <center>
                    <Button variant="outline-warning" onClick={()=>{navigate("/HostEvent")}}>Host the event!</Button>
                    </center>
                </div>
            </div>
        </>
    );
}

export default Home;
