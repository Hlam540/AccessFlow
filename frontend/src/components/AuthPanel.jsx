import { useState } from "react";

export default function AuthPanel({ user, onAuthUpdate }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState(null);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleLogin(event) {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setStatus("success");
      setForm({ username: "", password: "" });
      if (onAuthUpdate) onAuthUpdate(data);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  async function handleLogout() {
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include"
      });

      if (!res.ok) throw new Error("Logout failed");

      setStatus("success");
      if (onAuthUpdate) {
        onAuthUpdate({
          is_authenticated: false,
          is_staff: false,
          username: null
        });
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (user?.is_authenticated) {
    return (
      <div>
        <div className="card-header">
          <h2>Signed in</h2>
          <p>Manage access requests as a club officer.</p>
        </div>

        <div className="signed-in">
          <div>
            <strong>{user.username}</strong>
            <span className="meta-chip">
              {user.is_staff ? "Manager" : "Member"}
            </span>
          </div>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Sign out
          </button>
        </div>

        {status === "loading" && (
          <p className="status-message loading">Signing out...</p>
        )}
        {status === "error" && (
          <p className="status-message error">Unable to sign out.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="card-header">
        <h2>Club admin sign-in</h2>
        <p>Sign in to approve or deny access requests.</p>
      </div>

      <form className="request-form" onSubmit={handleLogin}>
        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="club-admin"
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </label>

        <div className="form-actions">
          <button className="btn" type="submit" disabled={status === "loading"}>
            Sign in
          </button>
        </div>
      </form>

      {status === "loading" && (
        <p className="status-message loading">Signing in...</p>
      )}
      {status === "error" && (
        <p className="status-message error">Invalid credentials.</p>
      )}
    </div>
  );
}
