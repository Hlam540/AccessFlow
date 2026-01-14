import { useState, useEffect } from "react";

export default function ManagerDashboardPage({ onDecision }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [query, setQuery] = useState("");
  const [decisionNotes, setDecisionNotes] = useState({});

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

  async function approveRequest(id) {
    try {
      const decision_note = decisionNotes[id]?.trim();
      await fetch(`http://localhost:8000/api/access-requests/${id}/approve/`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision_note })
      });
      loadRequests();
      setDecisionNotes(current => ({ ...current, [id]: "" }));
      if (onDecision) onDecision();
    } catch (err) {
      console.error("Approve failed", err);
    }
  }

  async function denyRequest(id) {
    try {
      const decision_note = decisionNotes[id]?.trim();
      await fetch(`http://localhost:8000/api/access-requests/${id}/deny/`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision_note })
      });
      loadRequests();
      setDecisionNotes(current => ({ ...current, [id]: "" }));
      if (onDecision) onDecision();
    } catch (err) {
      console.error("Deny failed", err);
    }
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filteredRequests = requests.filter(req => {
    const matchesStatus =
      statusFilter === "ALL" || req.status === statusFilter;
    if (!matchesStatus) return false;
    if (!normalizedQuery) return true;

    const haystack = `${req.resource_name} ${req.reason}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  return (
    <div>
      <div className="card-header">
        <h2>Manager dashboard</h2>
        <p>Review pending requests and record decisions.</p>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search by resource or reason"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <select
          className="select-input"
          value={statusFilter}
          onChange={event => setStatusFilter(event.target.value)}
        >
          <option value="ALL">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="DENIED">Denied</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      {loading && <p className="empty-state">Loading...</p>}

      {!loading && filteredRequests.length === 0 && (
        <p className="empty-state">No pending requests.</p>
      )}

      <div className="request-list">
        {filteredRequests.map(req => (
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

            {req.status === "PENDING" && (
              <div className="manager-actions">
                <input
                  className="decision-input"
                  type="text"
                  placeholder="Decision note (optional)"
                  value={decisionNotes[req.id] ?? ""}
                  onChange={event =>
                    setDecisionNotes(current => ({
                      ...current,
                      [req.id]: event.target.value
                    }))
                  }
                />
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
