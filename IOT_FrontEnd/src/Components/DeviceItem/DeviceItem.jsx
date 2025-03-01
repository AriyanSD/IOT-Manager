import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../utils/api";

export default function DeviceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const device = location.state?.device;
  const [alerts, setAlerts] = useState([]);
  
  // Fetch alerts for the device
  useEffect(() => {
    if (device) {
      const fetchAlerts = async () => {
        try {
          const response = await API.get(`/device/${device.id}/alerts`);
          setAlerts(response.data);
        } catch (err) {
          console.error("Error fetching alerts:", err);
        }
      };

      fetchAlerts();
    }
  }, [device]);

  if (!device) return <p>No device selected.</p>;

  const handleDelete = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this device?");
    if (confirmation) {
      try {
        await API.delete(`/device/${device.id}`);
        navigate("/devices"); 
      } catch (err) {
        console.error("Error deleting device:", err);
      }
    }
  };

  return (
    <div>
      <h2>Device Details</h2>
      <p><strong>Name:</strong> {device.device_name}</p>
      <p><strong>Status:</strong> {device.status}</p>
      <p><strong>Device Type:</strong> {device.device_type}</p>
      <p><strong>Location:</strong> {device.location}</p>
      <p><strong>Data:</strong> {device.data} {device.data_type}</p>
      <p><strong>Token:</strong> {device.device_token}</p>

      <h3>Alert History</h3>
      {alerts.length === 0 ? <p>No alerts found.</p> : (
        <ul>
          {alerts.map(alert => (
            <li key={alert.id}>
              <p>{alert.type}</p>
              <p>{alert.message} - {alert.time}</p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate(`/edit-device/${device.id}`, { state: { device } })}>
        Edit Device
      </button>
      <button onClick={handleDelete}>Delete Device</button>
    </div>
  );
}
