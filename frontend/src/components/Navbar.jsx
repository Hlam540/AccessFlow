export default function Navbar({ showManager }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-mark">AF</span>
        <div>
          <div className="brand-title">AccessFlow</div>
          <div className="brand-sub">Access management for student clubs</div>
        </div>
      </div>

      <div className="nav-links">
        <a href="#auth">Sign in</a>
        <a href="#request">Request</a>
        <a href="#my-requests">My Requests</a>
        {showManager && <a href="#manager">Manager</a>}
      </div>
    </nav>
  );
}
