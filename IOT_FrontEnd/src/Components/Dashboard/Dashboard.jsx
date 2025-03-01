import { useState } from "react";
import API from "../../utils/api";
import TopBar from "./TopBar";
import RoomsList from "../Rooms/RoomLists";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [roomName, setRoomName] = useState(""); 
    const [showAddRoomForm, setShowAddRoomForm] = useState(false); 
    const navigate = useNavigate();

    const handleAddRoom = async (e) => {
        e.preventDefault();

        if (!roomName) {
            alert("Room name is required.");
            return;
        }

        try {
            await API.post("/room", { room_name: roomName });
            setRoomName(""); 
            setShowAddRoomForm(false); 
        } catch (err) {
            console.error("Error adding room:", err);
            alert("Error adding room.");
        }
    };

    return (
        <div>
            <TopBar />
            <button onClick={() => navigate("/add-device")}>Add Device</button>
            
            <button onClick={() => setShowAddRoomForm(true)}>Add Room</button>

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
                        <button type="button" onClick={() => setShowAddRoomForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
            <RoomsList />
        </div>
    );
}
