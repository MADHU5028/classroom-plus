import "./Lobby.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Lobby() {
  const navigate = useNavigate();
  const { id } = useParams();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [permissionError, setPermissionError] = useState(false);
  const meetingCode = id!;

  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setPermissionError(true);
      }
    };

    startMedia();

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const toggleMic = () => {
    streamRef.current?.getAudioTracks().forEach(track => {
      track.enabled = !micOn;
    });
    setMicOn(!micOn);
  };

  const toggleCamera = () => {
    streamRef.current?.getVideoTracks().forEach(track => {
      track.enabled = !cameraOn;
    });
    setCameraOn(!cameraOn);
  };

  return (
    <div className="lobby-root">
      <div className="preview-section">
        <div className="video-card">
          {permissionError ? (
            <div className="permission-text">
              Camera or microphone access denied
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="video-preview"
            />
          )}

          <div className="preview-controls">
            <button
              className={`circle-btn ${!micOn ? "off" : ""}`}
              onClick={toggleMic}
            >
              Mic
            </button>

            <button
              className={`circle-btn ${!cameraOn ? "off" : ""}`}
              onClick={toggleCamera}
            >
              Camera
            </button>
          </div>
        </div>
      </div>

      <div className="join-section">
  <h2>Ready to join?</h2>

  <div className="meeting-code-box">
    <span className="label">Meeting code</span>
    <div className="code-row">
      <span className="code">{meetingCode}</span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(meetingCode);
          alert("Meeting code copied");
        }}
      >
        Copy
      </button>
    </div>
  </div>

  <button
    className="join-btn"
    onClick={() => navigate(`/meeting/${meetingCode}`)}
  >
    Join now
  </button>
</div>

    </div>
  );
}
