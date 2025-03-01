import { useState } from "react";
import UserSettings from "../UserSettings/UserSetting";

export default function TopBar() {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#ddd" }}>
            <h2>Dashboard</h2>
            <button onClick={() => setShowSettings(true)}>Edit Profile</button>
            {showSettings && <UserSettings onClose={() => setShowSettings(false)} />}
        </div>
    );
}
