import axios from "axios";

export const getLiveKitToken = async (
  room: string,
  identity: string,
  role: "host" | "participant"
) => {
  const res = await axios.post(
    "http://127.0.0.1:5000/api/livekit/token",
    { room, identity, role }
  );
  return res.data.token;
};
