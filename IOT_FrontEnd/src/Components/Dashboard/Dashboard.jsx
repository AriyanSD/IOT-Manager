import { useState } from "react";
import API from "../../utils/api";
import TopBar from "./TopBar";
import RoomsList from "../Rooms/RoomLists";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../Search/Search";

export default function Dashboard() {
    const [roomName, setRoomName] = useState(""); 
    const [showAddRoomForm, setShowAddRoomForm] = useState(false); 
    const [roomsUpdated, setRoomsUpdated] = useState(false); 
    const [searchType, setSearchType] = useState("devices");
    const [searchQuery, setSearchQuery] = useState("");
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
            setRoomsUpdated(prev => !prev); 
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
        <div>
                <div>
                        <label htmlFor="searchType">Search Type: </label>
                        <select
                            id="searchType"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="devices">Devices</option>
                            <option value="alerts">Alerts</option>
                        </select>
                    </div>
                    <div>
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


                    <button onClick={handleLogout}>Logout</button>
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

                    <RoomsList roomsUpdated={roomsUpdated} />
                </>
            )}
        </div>
    );
}
