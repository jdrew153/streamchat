import React, {FormEvent, useEffect, useState} from "react";
import {
    useStripe,
    useElements, CardElement
} from "@stripe/react-stripe-js";
import {Button} from "@mantine/core";
import './componentStyles/checkoutFormStyles.css'
import axios from "axios";
import GoldCoin from '../goldbitcoin_1.svg';
import {Avatar} from "@mantine/core";


const CheckoutForm:React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [donationSelected, setDonationSelected] = useState(false);
    const [customDonation, setCustomDonation] = useState<string | null>(null);

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

               { donationSelected ? (
                   <form id="checkout-form" onSubmit={handleSubmit}>
                       <div>
                           <label htmlFor="card-element" > Card Number </label>
                           <CardElement id="card-element" className='card-details-input'/>
                       </div>
                       <div className='submit-button-wrapper'>
                           <Button type='submit'>
                               Pay
                           </Button>
                       </div>
                   </form>
               ) : (
                   <>
                       <div className='donation-selection-container'>
                           <div className='donation-box'>
                               <Avatar src={GoldCoin} radius='xl'/>
                               <h5>
                                   1.00
                               </h5>
                           </div>
                           <div className='donation-box'>
                               <Avatar.Group spacing='sm'>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                               </Avatar.Group>
                               <h5>
                                   5.00
                               </h5>
                           </div>
                           <div className='donation-box'>
                               <Avatar.Group spacing='sm'>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                               </Avatar.Group>
                               <h5>
                                   10.00
                               </h5>
                           </div>
                           <div className='donation-box'>
                               <h5>
                                   Custom Amount?
                               </h5>

                           </div>
                       </div>
                       <div className='custom-message-container'>
                           <label htmlFor='message-input'> Write a Message!</label>
                           <textarea id='message-input'/>
                       </div>
                   </>
               )

               }
           </div>
        </>
    )
};

export default CheckoutForm