import React, {useState} from 'react';
import {TextInput, Button} from "@mantine/core";
import axios from "axios";
import { UserContext} from "../../utils/context";
import { useCookies } from 'react-cookie'
import {useNavigate} from "react-router-dom";


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
                <form>
                    <div>
                        <TextInput
                            placeholder='Enter your email'
                            type='text'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextInput
                            placeholder='Enter your password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button onClick={async () => {
                      const result:UserContext =  await handleLoginSubmit();
                      console.log("login result --> ", result.role)
                    }}>
                        Submit
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Login;
