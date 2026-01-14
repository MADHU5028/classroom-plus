import "./Header.css";
import { useAuth } from "../context/AuthContext";
import { logout, loginWithGoogle } from "../services/authService";
import { useEffect, useState } from "react";

export default function Header() {
  const user = useAuth();
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000 * 30); // update every 30s
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <header className="app-header">
      {/* LEFT */}
      <div className="header-left">CLASSROOM+</div>

      {/* RIGHT */}
      <div className="header-right">
        {/* DATE + TIME */}
        <div className="date-time">{formattedTime}</div>

        {/* USER */}
        {user && (
          <div className="avatar-wrapper">
            <img
              src={user.photoURL || ""}
              alt="profile"
              className="avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="account-menu">
                <div className="account-email">{user.email}</div>

                <button onClick={loginWithGoogle}>
                  Switch account
                </button>

                <button className="danger" onClick={logout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
