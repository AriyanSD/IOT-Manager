import React, { useEffect, useState, useRef } from "react";
import API from "../../../utils/api"; 
import { useLocation, useNavigate } from "react-router-dom";
import './VerifyEmail.css';
const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const tokenVerifiedRef = useRef(false);  

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        if (token && !tokenVerifiedRef.current) { 
            tokenVerifiedRef.current = true;  
            API.get(`/verify-email?token=${token}`)
                .then((response) => {
                    setMessage(response.data.message);
        
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);  
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        setMessage(error.response.data.error);
                    } else {
                        setMessage("An error occurred during email verification.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setMessage("No token provided.");
            setLoading(false);
        }
    }, [location.search, navigate]);  

    if (loading) {
        return <div className="loader">Loading...</div>;  
    }

    return (
        <div className="verification-container">
            <h2>Email Verification</h2>
            <p>{message}</p>
        </div>
    );
};

export default VerifyEmail;
