import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import "./RoomList.css";

export default function RoomsList({ roomsUpdated }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const fetchRooms = async () => {
    try {
      const response = await API.get("/user-rooms");
      setRooms(response.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, [roomsUpdated]);

  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}/devices`);
  };

  return (
    <div className="rooms-list">
      <h2>Your Rooms</h2>
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => (
            <li key={room.id} onClick={() => handleRoomClick(room.id)}>
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
