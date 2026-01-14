import { useState, useEffect } from "react";

export default function ManagerDashboardPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadRequests() {
    try {
      const res = await fetch("http://localhost:8000/api/access-requests/");
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

  async function approveRequest(id) {
    try {
      await fetch(`http://localhost:8000/api/access-requests/${id}/approve/`, {
        method: "PATCH"
      });
      loadRequests();
    } catch (err) {
      console.error("Approve failed", err);
    }
  }

  async function denyRequest(id) {
    try {
      await fetch(`http://localhost:8000/api/access-requests/${id}/deny/`, {
        method: "PATCH"
      });
      loadRequests();
    } catch (err) {
      console.error("Deny failed", err);
    }
  }

  const pendingRequests = requests.filter(req => req.status === "PENDING");

  return (
    <div>
      <div className="card-header">
        <h2>Manager dashboard</h2>
        <p>Review pending requests and record decisions.</p>
      </div>

      {loading && <p className="empty-state">Loading...</p>}

      {!loading && pendingRequests.length === 0 && (
        <p className="empty-state">No pending requests.</p>
      )}

      <div className="request-list">
        {pendingRequests.map(req => (
          <div key={req.id} className="request-item">
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

            <div className="manager-actions">
              <button
                className="btn"
                onClick={() => approveRequest(req.id)}
              >
                Approve
              </button>

              <button
                className="btn btn-danger"
                onClick={() => denyRequest(req.id)}
              >
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
