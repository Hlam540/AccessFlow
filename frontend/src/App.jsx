import Navbar from "./components/Navbar";
import UserRequestsPage from "./pages/UserRequestsPage";
import ManagerDashboardPage from "./pages/ManagerDashboardPage";
import SubmitRequest from "./pages/SubmitRequest";

function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <Navbar />

      <section id="user" style={{ marginBottom: "2rem" }}>
        <h2>Employee — Submit Access Request</h2>

        <SubmitRequest />

        <hr style={{ margin: "2rem 0" }} />

        <UserRequestsPage />
      </section>

      <section id="manager">
        <ManagerDashboardPage />
      </section>
    </div>
  );
}

export default App;
