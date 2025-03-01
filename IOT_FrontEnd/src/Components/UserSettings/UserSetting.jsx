import { useState, useEffect } from "react";
import API from "../../utils/api";

export default function UserSettings({ onClose }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        password: "",
        user_type: "individual", 
        verifiedNumber: false,
        verifiedEmail: false,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const response = await API.get(`/user`); 
                setFormData({
                    username: response.data.user.username,
                    email: response.data.user.email,
                    phone_number: response.data.user.phone_number,
                    password: "", 
                    user_type: response.data.user.user_type
                });
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        fetchUserData(); 
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { ...formData };
            if (updatedData.password === "") {
                delete updatedData.password; 
            }
            await API.put(`/user`, updatedData); 
            alert("Profile updated!");
            onClose();
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    return (
        <div style={{ position: "absolute", top: "20%", left: "30%", background: "#fff", padding: "20px", border: "1px solid #000" }}>
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password (leave empty to keep current)"
                    value={formData.password}
                    onChange={handleChange}
                />
                <select
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    required
                >
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
