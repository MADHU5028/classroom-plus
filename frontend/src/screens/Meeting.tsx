import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  ControlBar,
  RoomAudioRenderer,
  useTracks,
  
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getLiveKitToken } from "../services/livekitService";
import "./Meeting.css";
import { useRaiseHand } from "../hooks/useRaiseHand";
import RaiseHandButton from "../components/RaiseHandButton";

function MeetingUI() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
  ]);
const { raised, toggle } = useRaiseHand();

  return (
    <>
      <RoomAudioRenderer />

      <div className="video-stage">
        <GridLayout tracks={tracks} className="meeting-grid">
          <ParticipantTile />
        </GridLayout>
      </div>

      <footer className="meeting-footer">
        <div className="footer-center">
          <ControlBar />
        </div>
        <RaiseHandButton raised={raised} onToggle={toggle} />

      </footer>
    </>
  );
}

export default function Meeting() {
  const { id } = useParams();
  const location = useLocation();
  const role = location.state?.role || "participant";
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const join = async () => {
      const identity = `user_${Math.random().toString(36).slice(2)}`;
      const t = await getLiveKitToken(id!, identity, role);
      setToken(t);
    };
    join();
  }, [id, role]);

  if (!token) return <div className="meeting-loading">Connecting…</div>;

  return (
    <div className="meeting-root">
      <LiveKitRoom
        token={token}
        serverUrl={import.meta.env.VITE_LIVEKIT_URL}
        connect
        video
        audio
        className="livekit-room"
      >
        <MeetingUI />
      </LiveKitRoom>
    </div>
  );
}
