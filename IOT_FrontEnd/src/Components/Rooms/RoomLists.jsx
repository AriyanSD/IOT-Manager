import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function RoomsList() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await API.get("/user-rooms"); 
                setRooms(response.data);
            } catch (err) {
                console.error("Error fetching rooms:", err);
            }
        };

        fetchRooms();
    }, []);

    const handleRoomClick = (roomId) => {
        navigate(`/room/${roomId}/devices`); 
    };

    return (
        <div>
            <h2>Your Rooms</h2>
            {rooms.length > 0 ? (
                <ul>
                    {rooms.map((room) => (
                        <li key={room.id} onClick={() => handleRoomClick(room.id)} style={{ cursor: "pointer", padding: "10px", borderBottom: "1px solid #ddd" }}>
                            {room.room_name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No rooms found.</p>
            )}
        </div>
    );
}
