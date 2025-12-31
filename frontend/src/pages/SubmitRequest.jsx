import { useState } from "react";

export default function SubmitRequest() {
  const [form, setForm] = useState({
    resource_name: "",
    reason: "",
    duration_days: ""
  });

  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:8000/api/access-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm({ resource_name: "", reason: "", duration_days: "" });

    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Submit Access Request</h2>

      <form onSubmit={handleSubmit}>

        <label>
          Resource Name
          <input
            name="resource_name"
            value={form.resource_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Reason for Access
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Duration (days)
          <input
            name="duration_days"
            type="number"
            value={form.duration_days}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">
          Submit Request
        </button>
      </form>

      {status === "loading" && <p>Submitting…</p>}
      {status === "success" && <p style={{ color: "green" }}>Request submitted!</p>}
      {status === "error" && <p style={{ color: "red" }}>Something went wrong.</p>}
    </div>
  );
}
