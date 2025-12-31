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
      loadRequests(); // refresh list
    } catch (err) {
      console.error("Approve failed", err);
    }
  }

  async function denyRequest(id) {
    try {
      await fetch(`http://localhost:8000/api/access-requests/${id}/deny/`, {
        method: "PATCH"
      });
      loadRequests(); // refresh list
    } catch (err) {
      console.error("Deny failed", err);
    }
  }

  return (
    <div>
      <h2>Manager: Access Requests Dashboard</h2>

      {loading && <p>Loading...</p>}

      {!loading &&
        requests
          .filter(req => req.status === "PENDING")
          .map(req => (
            <div key={req.id} style={{ marginBottom: "1rem" }}>
              <strong>{req.resource_name}</strong> — {req.status}
              <br />
              <small>{req.reason}</small>
              <br />

              <button onClick={() => approveRequest(req.id)}>
                Approve
              </button>

              <button
                onClick={() => denyRequest(req.id)}
                style={{ marginLeft: "8px" }}
              >
                Deny
              </button>
            </div>
          ))}

      {!loading &&
        requests.filter(r => r.status === "PENDING").length === 0 && (
          <p>No pending requests.</p>
        )}
    </div>
  );
}
