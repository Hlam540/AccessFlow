import { useState } from "react";

export default function SubmitRequest({ onSubmitted }) {
  const [form, setForm] = useState({
    resource_name: "",
    reason: "",
    requested_days: 7
  });

  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const payload = {
        ...form,
        requested_days: Number(form.requested_days)
      };

      const res = await fetch("http://localhost:8000/api/access-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm({ resource_name: "", reason: "", requested_days: 7 });
      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div>
      <form className="request-form" onSubmit={handleSubmit}>
        <label>
          Resource
          <input
            name="resource_name"
            value={form.resource_name}
            onChange={handleChange}
            placeholder="Discord officer role, camera kit, Drive folder"
            required
          />
        </label>

        <label>
          Reason for access
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Briefly explain why you need access."
            required
          />
        </label>

        <label>
          Duration (days)
          <input
            name="requested_days"
            type="number"
            value={form.requested_days}
            onChange={handleChange}
            placeholder="7"
            required
          />
        </label>

        <div className="form-actions">
          <button className="btn" type="submit" disabled={status === "loading"}>
            Submit request
          </button>
        </div>
      </form>

      {status === "loading" && (
        <p className="status-message loading">Submitting request...</p>
      )}
      {status === "success" && (
        <p className="status-message success">Request submitted!</p>
      )}
      {status === "error" && (
        <p className="status-message error">Something went wrong.</p>
      )}
    </div>
  );
}
