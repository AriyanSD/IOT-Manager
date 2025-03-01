export default function AlertList({ alerts }) {
    return (
        <div>
            <h3>New Alerts</h3>
            {alerts.length === 0 ? <p>No alerts</p> : (
                <ul>
                    {alerts.map((alert) => (
                        <li key={alert.id}>{alert.message} - {alert.createdAt}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
