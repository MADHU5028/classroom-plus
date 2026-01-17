import "./Lobby.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function Lobby() {
  const navigate = useNavigate();
  const { id } = useParams();
  const meetingCode = id!;
  const user = useAuth();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 🔒 PRIVACY SAFE DEFAULTS
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  // 🎥 GET MEDIA ONCE (BEST PRACTICE)
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;

        // 🔐 Apply initial OFF state
        stream.getAudioTracks().forEach(track => {
          track.enabled = micOn;
        });

        stream.getVideoTracks().forEach(track => {
          track.enabled = cameraOn;
        });

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

  // 🎤 TOGGLE MIC
  const toggleMic = () => {
    streamRef.current?.getAudioTracks().forEach(track => {
      track.enabled = !micOn;
    });
    setMicOn(prev => !prev);
  };

  // 📷 TOGGLE CAMERA
  const toggleCamera = () => {
    streamRef.current?.getVideoTracks().forEach(track => {
      track.enabled = !cameraOn;
    });
    setCameraOn(prev => !prev);
  };

  return (
    <>
      {/* HEADER */}
      <Header />

      <div className="lobby-root">
        {/* LEFT – VIDEO PREVIEW */}
        <div className="preview-section">
          <div className="video-card">
            {/* USER NAME */}
            <div className="video-name">
              {user?.displayName || "You"}
            </div>

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

            {/* PREVIEW CONTROLS */}
            <div className="preview-controls">
              <button
                className={`control-btn ${!micOn ? "off" : ""}`}
                onClick={toggleMic}
              >
                <span className="material-icons">
                  {micOn ? "mic" : "mic_off"}
                </span>
              </button>

              <button
                className={`control-btn ${!cameraOn ? "off" : ""}`}
                onClick={toggleCamera}
              >
                <span className="material-icons">
                  {cameraOn ? "videocam" : "videocam_off"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT – JOIN */}
        <div className="join-section">
          <h2>Ready to join?</h2>

          <div className="meeting-code-box">
            <span className="label">Meeting code</span>
            <div className="code-row">
              <span className="code">{meetingCode}</span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(meetingCode)
                }
              >
                Copy
              </button>
            </div>
          </div>

          <button
            className="join-btn"
            onClick={() =>
              navigate(`/meeting/${meetingCode}`, {
                state: {
                  micOn,
                  cameraOn,
                },
              })
            }
          >
            Join now
          </button>
        </div>
      </div>
    </>
  );
}
