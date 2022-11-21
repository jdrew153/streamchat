import React, {FormEvent, useEffect, useState} from "react";
import {
    useStripe,
    useElements, CardElement
} from "@stripe/react-stripe-js";

import './componentStyles/checkoutFormStyles.css'
import axios from "axios";


const CheckoutForm:React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        //// TODO make the post request to the payment intent endpoint
        const response = await axios.post("http://localhost:8000/create-payment-intent", {
            "amount": 10000
        })
        console.log(response)
    }


    return (
        <>
           <div className='checkout-form-container'>

               <form id="checkout-form" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="card-element" > Card Number </label>
                      <CardElement id="card-element" className='card-details-input'/>
                  </div>
                  <div className='submit-button-wrapper'>
                      <button type='submit'>
                          Pay
                      </button>
                  </div>
               </form>
           </div>
        </>
    )
};

export default CheckoutForm