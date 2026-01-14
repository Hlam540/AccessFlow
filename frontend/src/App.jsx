import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserRequestsPage from "./pages/UserRequestsPage";
import ManagerDashboardPage from "./pages/ManagerDashboardPage";
import SubmitRequest from "./pages/SubmitRequest";

function App() {
  const [user, setUser] = useState({ is_staff: false });

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const res = await fetch("http://localhost:8000/api/me/");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) setUser(data);
      } catch (err) {
        console.error("Failed to load user", err);
      }
    }

    loadUser();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="app">
      <Navbar showManager={user.is_staff} />

      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Access management for student clubs</p>
          <h1>Request access without chasing DMs.</h1>
          <p className="hero-text">
            AccessFlow centralizes requests for club tools, roles, and equipment
            so decisions are fast and auditable.
          </p>
          <div className="hero-tags">
            <span className="tag">Drive folders</span>
            <span className="tag">Discord roles</span>
            <span className="tag">Equipment</span>
            <span className="tag">Event tools</span>
          </div>
        </div>

        <div className="hero-panel">
          <h3>How it works</h3>
          <ol className="hero-steps">
            <li>Members submit a request with a reason and duration.</li>
            <li>Managers review pending requests in one queue.</li>
            <li>Every decision is saved for the record.</li>
          </ol>
        </div>
      </header>

      <main className="content-grid">
        <section id="request" className="card">
          <div className="card-header">
            <h2>Request access</h2>
            <p>Ask for access to club resources like tools, roles, or equipment.</p>
          </div>
          <SubmitRequest />
        </section>

        <section id="my-requests" className="card">
          <UserRequestsPage />
        </section>

        {user.is_staff && (
          <section id="manager" className="card">
            <ManagerDashboardPage />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
