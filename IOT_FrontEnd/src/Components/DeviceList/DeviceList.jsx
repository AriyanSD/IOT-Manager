import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import "./DeviceList.css"; 

export default function DeviceList() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await API.get(`/${roomId}/devices`);
                console.log("roomDevices", response);
                setDevices(response.data);
            } catch (err) {
                console.error("Error fetching devices:", err);
            }
        };

        fetchDevices();
    }, [roomId]);

    return (
        <div className="device-list-container">
            <button className="back-button" onClick={() => navigate(-1)}>🔙 Go Back</button>
            <h3>Devices in Room</h3>
            {devices.length === 0 ? (
                <p>No devices found.</p>
            ) : (
                devices.map((device) => (
                    <div 
                        key={device.id} 
                        className="device-item"
                        onClick={() => navigate(`/device/${device.id}`, { state: { device } })}
                    >
                        <p><strong>Name:</strong> {device.device_name}</p>
                        <p><strong>Status:</strong> {device.status}</p>
                    </div>
                ))
            )}
        </div>
    );
}
