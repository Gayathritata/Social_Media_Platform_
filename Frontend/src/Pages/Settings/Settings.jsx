import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();
  const logoutBtnRef = useRef(null);
  const handleLogout = () => {
    const btn = logoutBtnRef.current;
    btn.classList.remove("pulse");

    void btn.offsetWidth;
    btn.classList.add("pulse");

    setTimeout(() => {
      alert("Logout clicked");

    }, 500);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <ArrowLeft className="back-arrow" size={24} onClick={() => navigate('/profile')} />
        <h2 className="page-title">Settings</h2>
      </div>
      {/* Display */}
      <h4 className="section-title">Display</h4>
      <div className="card" onClick={() => navigate("/theme")}>
        <span>Theme</span>
        <span className="arrow">{">"}</span>
      </div>

      <div className="card" onClick={() => navigate("/language")}>
        <span>Language Selection</span>
        <span className="arrow">{">"}</span>
      </div>


      {/* Posts */}


      <h4 className="section-title">Content</h4>
      <div className="card" onClick={() => navigate("/saved-posts")}>
        <span>Saved Posts</span>
        <span className="arrow">{">"}</span>
      </div>

      {/* Account */}
      <h4 className="section-title">Account</h4>

      <div className="card" onClick={() => navigate("/profile-setup")}>
        <span>Edit Profile</span>
        <span className="arrow">{">"}</span>
      </div>

      <div className="card" onClick={() => navigate("/change-password")}>
        <span>Change Password</span>
        <span className="arrow">{">"}</span>
      </div>

      <div className="card" onClick={() => navigate("/privacy")}>
        <span>Privacy Settings</span>
        <span className="arrow">{">"}</span>
      </div>

      <div className="card" onClick={() => navigate("/notifications")}>
        <span>Notifications</span>
        <span className="arrow">{">"}</span>
      </div>


      {/* Add Account */}
      <h4 className="section-title">Add Account</h4>
      <div className="card" onClick={() => navigate("/register")}>
        <span>Add Account</span>
        <span className="arrow">{">"}</span>
      </div>

      {/* Switch Account */}
      <h4 className="section-title">Switch Account</h4>
      <div className="card" onClick={() => navigate("/login")}>
        <span>Switch Account</span>
        <span className="arrow">{">"}</span>
      </div>

      {/* Logout */}
      <button
        ref={logoutBtnRef}
        className="logout"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Settings;



