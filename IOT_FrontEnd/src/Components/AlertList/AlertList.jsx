export default function AlertList({ alerts }) {
    return (
        <div className="alert-list-container">
            <h3>New Alerts</h3>
            {alerts.length === 0 ? (
                <p className="no-alerts">No alerts</p>
            ) : (
                <ul>
                    {alerts.map((alert) => (
                        <li key={alert.id}>
                            {alert.message}
                            <span>{alert.createdAt}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
