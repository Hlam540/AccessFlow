import { useState } from "react";

export default function ManagerDashboardPage() {
  const [requests, setRequests] = useState([
    { id: 1, resource_name: "Finance DB", reason: "Report access", status: "PENDING" },
    { id: 2, resource_name: "Admin Portal", reason: "Troubleshooting", status: "PENDING" }
  ]);

  const updateStatus = (id, status) => {
    setRequests(
      requests.map(r =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  return (
    <div>
      <h2>Manager: Access Requests Dashboard</h2>

      {requests.map(req => (
        <div key={req.id} style={{ marginBottom: "1rem" }}>
          <strong>{req.resource_name}</strong> — {req.status}
          <br />
          <small>{req.reason}</small>
          <br />

          <button onClick={() => updateStatus(req.id, "APPROVED")}>
            Approve
          </button>

          <button onClick={() => updateStatus(req.id, "DENIED")}>
            Deny
          </button>
        </div>
      ))}
    </div>
  );
}
