import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from "react-toastify" 
import { handleError, handleSuccess } from "../utils/utils";

function Signup(){

    const [signupInfo, setSignupInfo] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        const copySignupInfo = {...signupInfo}
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)

        // another Way is .................
        // setSignupInfo(prev => {
        //     return {
        //       ...prev,
        //       [e.target.name]: e.target.value
        //     }
        //   })
    }

    const handleSignup = async(e) => {
        e.preventDefault();
        const {name, email, password} = signupInfo
        if(!name || !email || !password){
            return handleError("All field is required")
        }
        try {
            const url = `http://localhost:5000/auth/signup`;
            const response = await fetch(url,{
                headers:{
                    'Content-type':'application/json'
                },
                method:"post",
                body:JSON.stringify(signupInfo)
            })
            
            const result = await response.json()
            console.log(result);
            
            handleError(result.message)
            const {message, success, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            
            }else if(error){
                handleError(error?.details[0].message);
            }else if(!success){
                handleError(message);
        }
        // console.log("result: ",result);
        } catch (error) {
            handleError(error)
        }
        
    }
    return(
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        name="name"
                        autoFocus
                        onChange={handleChange}
                        value={signupInfo.name}
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={signupInfo.email}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={signupInfo.password}
                        placeholder="Enter your password"
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have account ? 
                    &nbsp;<Link to='/login'>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup;