import { useState } from "react";

export default function UserRequestsPage() {
  const [resourceName, setResourceName] = useState("");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      resource_name: resourceName,
      reason,
      status: "PENDING"
    };

    // mock submit (later -> API call)
    setRequests([...requests, newRequest]);

    setResourceName("");
    setReason("");
  };

  return (
    <div>
      <h2>User: Submit Access Request</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div>
          <label>Resource Name:</label><br />
          <input
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Reason:</label><br />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Request</button>
      </form>

      <h3>My Requests</h3>

      {requests.length === 0 && <p>No requests yet.</p>}

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
