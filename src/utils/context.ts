import {createContext, useContext} from "react";



export interface UserContext {
    id: string,
    username: string,
    email: string,
    password: string,
    role: UserRoles
}

enum UserRoles {
    admin = "ADMIN",
    user = "USER"
}


export interface CheckoutStruct {
    paymentType: string,
    currency: string,
    amount: string
}

