import { useState, useEffect } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function DeviceForm() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("offline");
  const [data, setData] = useState("");
  const [dataType, setDataType] = useState("");
  const [rooms, setRooms] = useState([]); 
  const [selectedRoomId, setSelectedRoomId] = useState(""); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/devices", {
        device_name: deviceName,
        device_type: deviceType,
        location: location,
        status: status,
        data: parseFloat(data),
        data_type: dataType,
        room_id: selectedRoomId, 
      });

      setDeviceName("");
      setDeviceType("");
      setLocation("");
      setStatus("offline");
      setData("");
      setDataType("");
      setSelectedRoomId(""); 
      navigate("/"); 
    } catch (err) {
      console.error("Error adding device:", err);
    }
  };

  return (
    <div>
      <h2>Add a New Device</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Device Name</label>
          <input
            type="text"
            placeholder="Device Name"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Device Type</label>
          <input
            type="text"
            placeholder="Device Type"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="offline">Offline</option>
            <option value="Online">Online</option>
            <option value="stand_by">Stand By</option>
          </select>
        </div>
        <div>
          <label>Data</label>
          <input
            type="number"
            placeholder="Data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data Type</label>
          <input
            type="text"
            placeholder="Data Type"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Room</label>
          <select
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Device</button>
      </form>
    </div>
  );
}
