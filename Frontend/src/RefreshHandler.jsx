import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({setIsAuthentication}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            setIsAuthentication(true);
            if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup"){
                navigate("/home",{replace:false})
            }
        }
    }, [location, setIsAuthentication, navigate])
    return(
        null
    )
}

export default RefreshHandler