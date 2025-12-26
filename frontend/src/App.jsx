import Navbar from "./components/Navbar";
import UserRequestsPage from "./pages/UserRequestsPage";
import ManagerDashboardPage from "./pages/ManagerDashboardPage";

function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <Navbar />

      <section id="user" style={{ marginBottom: "2rem" }}>
        <UserRequestsPage />
      </section>

      <section id="manager">
        <ManagerDashboardPage />
      </section>
    </div>
  );
}

export default App;
