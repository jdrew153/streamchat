import React, {useEffect, useState} from "react";

import {Appearance, loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";


interface donationStruct {
    id:string,
    donor:string,
    amount:string,
    message:string
}
const DonationModal:React.FC = () => {
    /*@ts-ignore*/
    const stripePromise = loadStripe(process.env.STRIPE_API_KEY);
    const appearance:Appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#bf73ce"
        }
    }
    const options:StripeElementsOptions =  {
        appearance
    }
    return (
        <>

                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>


        </>
    );
};

export default DonationModal;