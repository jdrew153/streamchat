import React, {useState} from 'react';
import {TextInput, Button} from "@mantine/core";
import axios from "axios";
import { UserContext} from "../../utils/context";
import { useCookies } from 'react-cookie'
import {useNavigate} from "react-router-dom";
import './loginStyles.css'

const Login:React.FC = () => {

    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const handleLoginSubmit = async () => {
       if ((password === null) || (email === null)) {
           console.log("email and password are not set")
           return;
       }
       const response = await axios.post("http://localhost:8000/login-user",{
           "email": email,
           "password": password
       })

        if (response.status !== 200) {
            console.log(response.statusText)
        }
        setCookie("user", response.data)
        setTimeout(() => {
            navigate("/admin")
        }, 500)
        return response.data
    }
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    return (
        <>
            <div className='main-login-page-container'>
                <form className='login-form' onSubmit={async (e) => {
                    e.preventDefault()
                    const result:UserContext =  await handleLoginSubmit();
                    console.log("login result --> ", result.role)
                }}>
                    <header>
                        Admin User Login
                    </header>
                    <div>
                        <TextInput
                            placeholder='Enter your email'
                            type='text'
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <TextInput
                            placeholder='Enter your password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='off'
                        />
                    </div>
                   <div className='submit-button-wrapper'>
                       <Button className='submit-button' type='submit'>
                           Submit
                       </Button>
                   </div>
                </form>
            </div>
        </>
    );
};

export default Login;
