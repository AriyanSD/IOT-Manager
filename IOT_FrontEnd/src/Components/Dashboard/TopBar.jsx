import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";
import UserSettings from "../UserSettings/UserSetting";

export default function TopBar({ onAddRoom, onLogout }) {
    const [showSettings, setShowSettings] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [showAddRoomForm, setShowAddRoomForm] = useState(false);
    const navigate = useNavigate();

    const handleAddRoom = (e) => {
        e.preventDefault();

        if (!roomName) {
            alert("Room name is required.");
            return;
        }

        onAddRoom(roomName);
        setRoomName("");
        setShowAddRoomForm(false);
    };

    const handleCancelAddRoom = () => {
        setRoomName("");  
        setShowAddRoomForm(false);  
    };

    const handleNavigateAddDevice = () => {
        navigate("/add-device");  
    };

    return (
        <div className="top-bar">
            <h2>Dashboard</h2>
            <button onClick={() => setShowSettings(true)}>Edit Profile</button>
            {showSettings && <UserSettings onClose={() => setShowSettings(false)} />}

            <button onClick={() => setShowAddRoomForm(!showAddRoomForm)}>
                {showAddRoomForm ? "Cancel" : "Add Room"}
            </button>

            {showAddRoomForm && (
                <div className="add-room-form">
                    <h3>Add New Room</h3>
                    <form onSubmit={handleAddRoom}>
                        <label>
                            Room Name:
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Add Room</button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancelAddRoom}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <button onClick={onLogout} className="logout-button">Logout</button>
            <button onClick={handleNavigateAddDevice}>Add Device</button>
        </div>
    );
}
