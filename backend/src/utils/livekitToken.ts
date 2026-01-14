import { AccessToken } from "livekit-server-sdk";
console.log("API KEY:", process.env.LIVEKIT_API_KEY);
console.log("API SECRET:", process.env.LIVEKIT_API_SECRET);

export const createLiveKitToken = (
  room: string,
  identity: string,
  role: "host" | "participant"
) => {
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    { identity }
  );

  token.addGrant({
    roomJoin: true,
    room,
    canPublish: true,
    canSubscribe: true,
  });

  if (role === "host") {
    token.addGrant({ roomAdmin: true });
  }

  // 🔥 THIS LINE IS THE FIX
  return token.toJwt();
};
