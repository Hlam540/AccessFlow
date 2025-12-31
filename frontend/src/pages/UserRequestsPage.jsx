import { useState, useEffect } from "react";

export default function UserRequestsPage() {
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

  return (
    <div>
      <h3>My Requests</h3>

      {loading && <p>Loading...</p>}

      {!loading && requests.length === 0 && (
        <p>No requests yet.</p>
      )}

      <ul>
        {requests.map(req => (
          <li key={req.id}>
            <strong>{req.resource_name}</strong> — {req.status}
            <br />
            <small>{req.reason}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
