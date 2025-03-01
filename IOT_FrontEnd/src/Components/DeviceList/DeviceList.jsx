import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function DeviceList() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await API.get(`/${roomId}/devices`);
                setDevices(response.data);
            } catch (err) {
                console.error("Error fetching devices:", err);
            }
        };

        fetchDevices();
    }, [roomId]);

    return (
        <div>
            <h3>Devices in Room</h3>
            {devices.length === 0 ? (
                <p>No devices found.</p>
            ) : (
                devices.map((device) => (
                    <div 
                        key={device.id} 
                        onClick={() => navigate(`/device/${device.id}`, { state: { device } })}
                        style={{ cursor: "pointer", padding: "10px", border: "1px solid #ccc", marginBottom: "5px" }}
                    >
                        <p><strong>Name:</strong> {device.name}</p>
                        <p><strong>Status:</strong> {device.status}</p>
                    </div>
                ))
            )}
        </div>
    );
}
