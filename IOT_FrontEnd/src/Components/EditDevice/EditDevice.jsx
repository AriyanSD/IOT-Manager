import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../utils/api";
import "./EditDevice.css";
export default function EditDeviceForm() {
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const device = routeLocation.state?.device;

  const [deviceName, setDeviceName] = useState(device?.device_name || "");
  const [deviceType, setDeviceType] = useState(device?.device_type || "");
  const [location, setLocation] = useState(device?.location || "");
  const [status, setStatus] = useState(device?.status || "offline");
  const [data, setData] = useState(device?.data || "");
  const [dataType, setDataType] = useState(device?.data_type || "");
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(device?.room_id || "");

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
      await API.put(`/device/${device.id}`, {
        device_name: deviceName,
        device_type: deviceType,
        location: location,
        status: status,
        data: parseFloat(data),
        data_type: dataType,
        roomId: selectedRoomId,
      });
  
      navigate(`/dashboard`);
    } catch (err) {
      console.error("Error updating device:", err);
    }
  };

  return (
    <div className="edit-device-container">
      <button className="back-button" onClick={() => navigate(-1)}>🔙 Go Back</button>
      <h2>Edit Device</h2>
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
        <button type="submit">Update Device</button>
      </form>
    </div>
  );
}
