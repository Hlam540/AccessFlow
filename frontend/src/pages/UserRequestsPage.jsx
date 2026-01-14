import { useState, useEffect } from "react";

export default function UserRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadRequests() {
    try {
      const res = await fetch("http://localhost:8000/api/access-requests/", {
        credentials: "include"
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to load requests", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div>
      <div className="card-header">
        <h2>My requests</h2>
        <p>Track the status of your access requests.</p>
      </div>

      {loading && <p className="empty-state">Loading...</p>}

      {!loading && requests.length === 0 && (
        <p className="empty-state">No requests yet.</p>
      )}

      <ul className="request-list">
        {requests.map(req => (
          <li key={req.id} className="request-item">
            <div className="request-meta">
              <strong>{req.resource_name}</strong>
              <span
                className={`status-pill status-${req.status.toLowerCase()}`}
              >
                {req.status}
              </span>
              {req.requested_days && (
                <span className="meta-chip">{req.requested_days} days</span>
              )}
            </div>
            <small>{req.reason}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
