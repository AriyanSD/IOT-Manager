import React, { useEffect, useState, useRef } from "react";
import API from "../../../utils/api"; 
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
    const location = useLocation();
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
    }, [location.search]);  

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{message}</p>
        </div>
    );
};

export default VerifyEmail;
