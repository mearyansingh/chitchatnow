import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar p-4">
      <div className="d-flex align-items-center mb-4 ps-2">
        <h4 className="mb-0 fw-bold text-primary">ChatWave</h4>
      </div>
      <nav className="nav flex-column">
        <NavLink to="/home" className="nav-link">
          <i className="bi bi-chat-dots"></i> Chats
        </NavLink>
        <NavLink to="/contacts" className="nav-link">
          <i className="bi bi-people"></i> Contacts
        </NavLink>
        <NavLink to="/calls" className="nav-link">
          <i className="bi bi-telephone"></i> Calls
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          <i className="bi bi-person"></i> Profile
        </NavLink>
        <NavLink to="/settings" className="nav-link">
          <i className="bi bi-gear"></i> Settings
        </NavLink>
      </nav>
      <div className="mt-auto pt-5">
        <div className="d-flex align-items-center p-2">
          <img src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="avatar me-2" />
          <div>
            <h6 className="mb-0">Alex Morgan</h6>
            <div className="small text-muted">
              <span className="user-status status-online me-1"></span>
              Online
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar