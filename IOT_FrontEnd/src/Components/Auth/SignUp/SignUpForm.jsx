import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from ".././../../utils/api"; 

export default function Signup () {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        password: "",
        user_type: "",
    });
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]); 
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const { data } = await API.get("/get-rules");
                setRoles(data);
                setFormData((prev) => ({ ...prev, user_type: data[0] })); 
            } catch (err) {
                console.error("Error fetching roles:", err);
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            await API.post("/register", formData);
            setMessage("Registration successful! Please verify your email.");
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>🔙 Go Back</button>
            <h2>Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                <select name="user_type" value={formData.user_type} onChange={handleChange} required>
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

