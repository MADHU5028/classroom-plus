import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createMeeting, validateMeeting } from "../services/meetingservice";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const user = useAuth();

  const handleCreateMeeting = async () => {
    try {
      const meetingId = await createMeeting();
      navigate(`/lobby/${meetingId}`, { state: { role: "host" } });
    } catch (err) {
      alert("Failed to create meeting");
      console.error(err);
    }
  };

  const handleJoinMeeting = async () => {
    if (!meetingCode) {
      alert("Enter meeting code");
      return;
    }

    try {
      const valid = await validateMeeting(meetingCode);
      if (!valid) {
        alert("Invalid meeting code");
        return;
      }

      navigate(`/lobby/${meetingCode}`, {
        state: { role: "participant" },
      });
    } catch (err) {
      alert("Backend not reachable");
      console.error(err);
    }
  };

  return (
    <div className="home-root">
      
      <Header />

      <main className="home-main">
        <h1>Built for Teaching. Designed for Focus.</h1>
<p>
  A fast and secure video meeting platform built for focused
  conversations, live teaching, and seamless collaboration.
</p>
        <div className="card-row">
          <div className="card">
            <h3>Start Meeting</h3>
            <span>Create an instant meeting room</span>
            <button className="btn-light" onClick={handleCreateMeeting}>
              New Meeting
            </button>
          </div>

          <div className="card">
            <h3>Join Meeting</h3>
            <span>Enter a meeting code or link</span>

            <div className="join-row">
              <input
                placeholder="Meeting code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
              />
              <button className="btn-light small" onClick={handleJoinMeeting}>
                Join
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
