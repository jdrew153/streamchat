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
import { CheckoutStruct } from "../utils/context";


const CheckoutForm:React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [donationSelected, setDonationSelected] = useState(0);
    const [headToCheckout, setHeadToCheckout] = useState(false);
    const [donationCode, setDonationCode] = useState<string>('');
    const [paymentIntention, setPaymentIntention] = useState<CheckoutStruct | null>(null);



    const handleSubmit = async () => {
        if (!stripe || !elements || (paymentIntention === null)) {
            return;
        }
        //// TODO make the post request to the payment intent endpoint
        const response = await axios.post("http://localhost:8000/create-payment-intent", {
            "paymentType": paymentIntention.paymentType,
            "currency": paymentIntention.currency,
            "amount": paymentIntention.amount
        })
        console.log('response',response)
    }


    return (
        <>
           <div className='checkout-form-container'>

               { headToCheckout ? (
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
                           <div className={donationSelected === 1 ? ("selected-donation-box") : ('donation-box') } onClick={() => {
                               setDonationSelected(1);
                               setDonationCode("unDollares")
                               if (donationCode.length > 2) {
                                setPaymentIntention({
                                    currency: 'usd',
                                    paymentType: 'card',
                                    amount: donationCode 
                                
                                })
                              } else alert('no donation code set')
                            console.log(paymentIntention)
                           }}>
                               <Avatar src={GoldCoin} radius='xl' className='coin-avatar'/>
                               <h5>
                                   $1.00
                               </h5>
                           </div>
                           <div className={donationSelected === 2 ? ("selected-donation-box") : ('donation-box') } onClick={() => {
                               setDonationSelected(2);
                               setDonationCode("cincoDollares")
                               if (donationCode.length > 2) {
                                setPaymentIntention({
                                    currency: 'usd',
                                    paymentType: 'card',
                                    amount: donationCode 
                                
                                })
                              } else alert('no donation code set')
                            console.log(paymentIntention)
                           }}>
                               <Avatar.Group spacing='sm' className='coin-avatar'>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                               </Avatar.Group>
                               <h5>
                                   $5.00
                               </h5>
                           </div>
                           <div className={donationSelected === 3 ? ("selected-donation-box") : ('donation-box') } onClick={() => {
                               setDonationSelected(3);
                               setDonationCode("diazDollares")
                              if (donationCode.length > 2) {
                                setPaymentIntention({
                                    currency: 'usd',
                                    paymentType: 'card',
                                    amount: donationCode 
                                
                                })
                              } else alert('no donation code set')
                            console.log(paymentIntention)
                           }}>
                               <Avatar.Group spacing='sm' className='coin-avatar'>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                               </Avatar.Group>
                               <h5>
                                   $10.00
                               </h5>
                           </div>
                           <div className={donationSelected === 4 ? ("selected-donation-box") : ('donation-box') } onClick={() => {
                               setDonationSelected(4);
                               setDonationCode("manyDollares")
                               if (donationCode.length > 2) {
                                setPaymentIntention({
                                    currency: 'usd',
                                    paymentType: 'card',
                                    amount: donationCode 
                                
                                })
                              } else alert('no donation code set')
                            console.log(paymentIntention)
                           }}>
                               <Avatar.Group spacing='sm' className='coin-avatar'>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                                   <Avatar src={GoldCoin} radius='xl'/>
                               </Avatar.Group>
                               <h5>
                                  $20.00
                               </h5>

                           </div>
                       </div>
                       { donationSelected !==0 &&
                       
                           <div className='custom-message-container'>
                            <h5>
                                You selected {donationCode}
                            </h5>
                               <label htmlFor='message-input'> Write a Message!</label>
                               <textarea id='message-input' placeholder='You guys are awesome!!'/>
                               <Button className='checkout-button' onClick={async () => {
                                   
                                    const res = await handleSubmit();
                                   console.log('submit response', res)
                                   setHeadToCheckout(true)
                               }}>
                                   Checkout
                               </Button>
                           </div>

                       }
                   </>
               )

               }
           </div>
        </>
    )
};

export default CheckoutForm