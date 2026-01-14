interface Props {
  micOn: boolean;
  cameraOn: boolean;
  onMicToggle: () => void;
  onCameraToggle: () => void;
  onScreenShare: () => void;
  onLeave: () => void;
}

export default function ControlBar({
  micOn,
  cameraOn,
  onMicToggle,
  onCameraToggle,
  onScreenShare,
  onLeave,
}: Props) {
  return (
    <div className="control-bar">
      <button onClick={onMicToggle}>
        {micOn ? "🎤 Mic On" : "🔇 Mic Off"}
      </button>

      <button onClick={onCameraToggle}>
        {cameraOn ? "📷 Camera On" : "🚫 Camera Off"}
      </button>

      <button onClick={onScreenShare}>🖥 Share</button>

      <button className="leave" onClick={onLeave}>
        ⛔ Leave
      </button>
    </div>
  );
}
