import { useState } from "react";
import API from "../../../utils/api"; 
import { useNavigate } from "react-router-dom";

export default function Login () {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const { data } = await API.post("/login", formData);
            localStorage.setItem("token", data.token);
            setMessage("Login successful!");
            navigate("/dashboard");
            
        } catch (err) {
            setError(err.response?.data?.error || "Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate("/register")}>
                Sign Up
            </button>
        </div>
    );
};
