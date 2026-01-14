import { useState } from "react";

export const useMeetingControls = () => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  return {
    micOn,
    cameraOn,
    screenSharing,
    showChat,
    showParticipants,
    toggleMic: () => setMicOn(v => !v),
    toggleCamera: () => setCameraOn(v => !v),
    toggleScreen: () => setScreenSharing(v => !v),
    toggleChat: () => setShowChat(v => !v),
    toggleParticipants: () => setShowParticipants(v => !v),
  };
};
