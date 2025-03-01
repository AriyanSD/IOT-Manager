import { useState } from "react";
import API from "../../utils/api";
import TopBar from "./TopBar";
import RoomsList from "../Rooms/RoomLists";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../Search/Search";
import "./Dashboard.css";

export default function Dashboard() {
    const [roomName, setRoomName] = useState(""); 
    const [roomsUpdated, setRoomsUpdated] = useState(false); 
    const [searchType, setSearchType] = useState("devices");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleAddRoom = async (roomName) => {
        try {
            await API.post("/room", { room_name: roomName });
            setRoomsUpdated((prev) => !prev); 
        } catch (err) {
            console.error("Error adding room:", err);
            alert("Error adding room.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");  
        navigate("/login");  
    };

    return (
        <div className="dashboard">
            <div className="search-section">
                <label htmlFor="searchType">Search Type: </label>
                <select
                    id="searchType"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="devices">Devices</option>
                    <option value="alerts">Alerts</option>
                </select>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${searchType}`}
                />
            </div>

            {searchQuery ? (
                <SearchComponent searchQuery={searchQuery} searchType={searchType} />
            ) : (
                <>
                    <TopBar onAddRoom={handleAddRoom} onLogout={handleLogout} />
                    <RoomsList roomsUpdated={roomsUpdated} />
                </>
            )}
        </div>
    );
}
