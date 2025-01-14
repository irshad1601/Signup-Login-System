import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/utils";

function Login(){
    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const handleChage = (e) => {
       setLoginInfo((prev) => (
        {
            ...prev,
            [e.target.name]:e.target.value
        }
       ))
    }
    // console.log(loginInfo);

    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password} = loginInfo;
        
        if(!email )
        {
            return handleError("Email is required");
        }
        if(!password)
            {
                return handleError("Password is required");
            }
        try {
            // const url = `http://localhost:5000/auth/login`
            const url = `https://signup-login-system-seven.vercel.app/auth/login`
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            })
            const result =  await response.json();
            const {name, success, message, jwtToken, error} = result;
            // console.log("success: " ,success);
            
            if(success){
                handleSuccess(message);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name);
                localStorage.setItem("token", jwtToken);
                setTimeout(() =>{
                navigate("/home")
                },1000)
            }else if(error){
                handleError(error?.details[0].message)            
            }else if(!success){
                handleError("Invalid email and password")
            }
        } catch (error) {
            handleError(error)
        }
    }
    
    return(
        <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email"
                    autoFocus
                    onChange={handleChage}
                    value={loginInfo.email}
                    placeholder="Enter you email"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    onChange={handleChage}
                    value={loginInfo.password}
                    placeholder="Enter your password"
                />
            </div>
            <button>Login</button>
        </form>
        <span>Don&apos;t have account ? <Link to='/signup'>Signup</Link></span>
        <ToastContainer />
        </div>
    )
}

export default Login;
