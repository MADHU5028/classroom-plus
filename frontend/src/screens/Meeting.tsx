import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  ControlBar,
  RoomAudioRenderer,
  useTracks,
  useRoomContext,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getLiveKitToken } from "../services/livekitService";
import "./Meeting.css";
import { useRaiseHand } from "../hooks/useRaiseHand";
import RaiseHandButton from "../components/RaiseHandButton";
import { getAuth } from "firebase/auth";
/* -------------------- MEETING UI -------------------- */

function MeetingUI() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
  ]);

  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const { raised, toggle } = useRaiseHand();
  const [raisedHands, setRaisedHands] = useState<Record<string, boolean>>({});
 

  if (!room) return null;

  /* ---------------- RAISE HAND ---------------- */
  const handleRaiseHand = () => {
    if (!localParticipant) return;

    toggle();

    localParticipant.publishData(
      new TextEncoder().encode(
        JSON.stringify({
          type: "RAISE_HAND",
          identity: localParticipant.identity,
          raised: !raised,
        })
      ),
      { reliable: true }
    );
  };

  /* ---------------- DATA LISTENERS ---------------- */
  useEffect(() => {
    const dataHandler = (payload: Uint8Array) => {
      const msg = JSON.parse(new TextDecoder().decode(payload));
      if (msg.type === "RAISE_HAND") {
        setRaisedHands((prev) => ({
          ...prev,
          [msg.identity]: msg.raised,
        }));
      }
    };

    const participantDisconnectedHandler = (p: any) => {
      setRaisedHands((prev) => {
        const copy = { ...prev };
        delete copy[p.identity];
        return copy;
      });
    };

    room.on("dataReceived", dataHandler);
    room.on("participantDisconnected", participantDisconnectedHandler);

    return () => {
      room.off("dataReceived", dataHandler);
      room.off("participantDisconnected", participantDisconnectedHandler);
    };
  }, [room]);

  /* ---------------- UI ---------------- */
  return (
    <>
      <RoomAudioRenderer />

      <div className="video-stage">
        {/* 🔴 IMPORTANT: GridLayout MUST have ONE child */}
        <GridLayout tracks={tracks} className="meeting-grid">
          <ParticipantTile />
        </GridLayout>

        {/* ✅ SAFE RAISE-HAND OVERLAY */}
        <div className="raised-hand-overlay">
          {Object.entries(raisedHands).map(([identity, isRaised]) =>
            isRaised ? (
              <div key={identity} className="raised-hand-chip">
                ✋ {identity}
              </div>
            ) : null
          )}
        </div>
      </div>

      <footer className="meeting-footer">
        <div className="footer-center">
          <ControlBar />
        </div>
        <RaiseHandButton raised={raised} onToggle={handleRaiseHand} />
      </footer>
    </>
  );
}

/* -------------------- MEETING PAGE -------------------- */

export default function Meeting() {
  const { id } = useParams();
  const location = useLocation();
  const role = location.state?.role || "participant";
  const [token, setToken] = useState<string | null>(null);
const auth = getAuth();
const user = auth.currentUser;
  useEffect(() => {
    const join = async () => {
     

const displayName =
  user?.displayName || "User";

const identity =
  user?.uid || `user_${Math.random().toString(36).slice(2)}`;


const t = await getLiveKitToken(
  id!,
  identity,
  role,
  displayName
);

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
