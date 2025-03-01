import { useState } from "react";
import API from "../../../utils/api"; 
import { useNavigate } from "react-router-dom";
import "./Login.css";

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
        <div className="login-container">
    <h2>Login</h2>
    {error && <p className="error">{error}</p>}
    {message && <p className="success">{message}</p>}

    <form onSubmit={handleSubmit}>
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
        />
        <button type="submit">Login</button>
    </form>
    <button className="signup-btn" onClick={() => navigate("/register")}>
        Sign Up
    </button>
</div>

    );
};
