import "./Meeting.css";
import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getLiveKitToken } from "../services/livekitService";

function MeetingUI() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

  return (
    <div className="meeting-layout">
      <GridLayout tracks={tracks} className="meeting-grid">
        <ParticipantTile />
      </GridLayout>

      <ControlBar className="meeting-controls" />
    </div>
  );
}

export default function Meeting() {
  const { id } = useParams();
  const location = useLocation();
  const role = location.state?.role || "participant";
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const joinRoom = async () => {
      const identity = `user_${Math.random().toString(36).slice(2)}`;
      const t = await getLiveKitToken(id!, identity, role);
      setToken(t);
    };
    joinRoom();
  }, [id, role]);

  if (!token) {
    return <div className="meeting-loading">Connecting…</div>;
  }

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
