import React from 'react'
import { useEffect, useState } from 'react';
import { useRef } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {useSelector} from 'react-redux'

function Paypal() {
    const paypal=useRef();
    const location=useLocation()
    const navigate=useNavigate()
    //console.log(location)
    const cart=location.state.element;
    
    const price=location.state.element.TicketCost
    const currentUser = useSelector((state) => state.user.userObj);
    useEffect(()=>{
      window.paypal.Buttons({
        createOrder:(data,actions,err)=>{
            return actions.order.create({
                intent: "CAPTURE",
                purchase_units:[
                    {
                        description: "coal table",
                        amount:{
                            currency_code: "USD",
                            value: (price/80).toFixed(2)
                        }
                    }
                ]
            })
        },
                onApprove: async(data,actions)=>{
                    const order=await actions.order.capture();
                    
                    console.log(order,currentUser,cart)
                    cart.ord_id=order.id;
                    console.log(cart)
                    axios.post("http://localhost:4000/confirm/order", {
                        eventname:cart,
                        userId: currentUser.username,
                        paymentStatus: order.status,
                        payerDetails:{
                          name: order.payer.name,
                          email: order.payer.email_address,
                          address: order.payer.address,
                        }
                      })
                      .then(res=>{
                       console.log(res.data)
                       axios
      .post("http://localhost:4000/admin/UpdateTicket", cart)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => alert("something went wrong!!"));
                       
                       navigate('/SuccessPage',{state:{cart}})
                        
                      })
                      .catch(error=>console.log(error))
                    
                },
                onError:(err)=>{
                    console.log(err)
                }
          }).render(paypal.current)
    },[])

    
  return (
    <div className='m-4'>
        <div ref={paypal}></div>
    </div>
  )
}

export default Paypal