import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getLiveKitToken } from "../services/livekitService";

export default function Meeting() {
  const { id } = useParams();
  const location = useLocation();
  const role = location.state?.role || "participant";

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
  const joinRoom = async () => {
    try {
      const identity = `user_${Math.random().toString(36).slice(2)}`;
      console.log("Requesting token for:", id, identity, role);

      const t = await getLiveKitToken(id!, identity, role);

      console.log("LiveKit token received:", t);
      setToken(t);
    } catch (err) {
      console.error("Failed to get LiveKit token", err);
    }
  };

  joinRoom();
}, [id, role]);


  if (!token) return <p>Connecting to meeting…</p>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={import.meta.env.VITE_LIVEKIT_URL}
      connect
      video
      audio
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
