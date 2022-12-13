import React from 'react';
import './SuccessPage.css'

import { useLocation } from "react-router-dom";
function SuccessPage() {
    const { state } = useLocation();
    let samp=state.cart
    let ord_id=state.ord_id
    console.log(samp)
  return (
   <div >
  <div className='container justify-content-center;'>
    <div className="ticket">
	<div className="left">
		<div className="image">
			<p className="admit-one">
				<span>ADMIT ONE</span>
				<span>ADMIT ONE</span>
				<span>ADMIT ONE</span>
			</p>
			<div className="ticket-number">
				<p>
					{ord_id}
				</p>
			</div>
		</div>
		<div className="ticket-info">
			<p className="date">
				
				<span className="june-29">{samp.d}</span>
				
			</p>
			<div className="show-name">
				<h1>{samp.username}</h1>
				
			</div>
			<div className="time">
			
				<p>DOORS <span>@</span> {samp.t}{samp.period}</p>
			</div>
			<p className="location"><span>{samp.venue}</span>
				<span className="separator"><i className="far fa-smile"></i></span><span>Salt Lake City, Utah</span>
			</p>
		</div>
	</div>
	<div className="right">
		<p className="admit-one">
			<span>ADMIT ONE</span>
			<span>ADMIT ONE</span>
			<span>ADMIT ONE</span>
		</p>
		<div className="right-info-container">
			<div className="show-name">
				<h1>{samp.username}</h1>
			</div>
			<div className="time">
      <p>DOORS <span>@</span> {samp.t}{samp.period}</p>
			</div>
			<div className="barcode">
				<img src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb" alt="QR code"/>
			</div>
			<p className="ticket-number">
				#{ord_id}
			</p>
		</div>
	</div>
</div>

</div>
</div>
  )
}

export default SuccessPage