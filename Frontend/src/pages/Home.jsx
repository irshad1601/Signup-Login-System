import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Home(){
    const [loggedInUser, setLoggedInUser] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        setLoggedInUser(localStorage.getItem("loggedInUser"))
        
    }, [])

    const fetchProducts = async () => {
        try {
            const url = `http://localhost:5000/products`
            const response = await fetch(url, {
                method:"get",
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            });
            const result = await response.json();
            console.log(result);
            setProducts(result)
            console.log("value: ",products);

        } catch (error) {
            console.log(error);
            
            handleError(error)
        }
    }
    console.log("Message: ",products);
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess("Logout successfylly.....");
        setTimeout(() => {
            navigate("/login");
        }, 2000)
    }
    return(
        <>
            <h1>welcome back: {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
        <div className="product-container">
                {products?.length > 0 ? products?.map((items, index)=> (
                    <div className="product" key={index}>
                    <h2>{items.name}</h2>
                    <p>{items.price}</p>
                    </div>
                )) : <p>No products available</p>}
        </div>
        <ToastContainer />
        </>
    )
}
export default Home;