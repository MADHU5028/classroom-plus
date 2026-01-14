import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createMeeting, validateMeeting } from "../services/meetingservice";

export default function Home() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  // ✅ CREATE → ALWAYS GO TO LOBBY
  const handleCreateMeeting = async () => {
    try {
      const meetingId = await createMeeting();
      console.log("Created meeting:", meetingId);

      navigate(`/lobby/${meetingId}`, {
        state: { role: "host" },
      });
    } catch (err) {
      alert("Failed to create meeting");
      console.error(err);
    }
  };

  // ✅ JOIN → VALIDATE → GO TO LOBBY
  const handleJoinMeeting = async () => {
    if (!meetingCode) {
      alert("Enter meeting code");
      return;
    }

    try {
      const valid = await validateMeeting(meetingCode);
      console.log("Join validation:", valid);

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
      <header className="home-header">
        <div className="logo">CLASSROOM+</div>
      </header>

      <main className="home-main">
        <h1>Built for Teaching. Designed for Focus.</h1>

        <div className="card-row">
          {/* CREATE */}
          <div className="card">
            <h3>Start Meeting</h3>
            <span>Create an instant meeting room</span>
            <button className="btn-light" onClick={handleCreateMeeting}>
              New Meeting
            </button>
          </div>

          {/* JOIN */}
          <div className="card">
            <h3>Join Meeting</h3>
            <span>Enter a meeting code or link</span>

            <div className="join-row">
              <input
                placeholder="Meeting code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
              />
              <button
                className="btn-light small"
                onClick={handleJoinMeeting}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
