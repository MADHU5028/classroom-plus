import { AccessToken } from "livekit-server-sdk";

export const createLiveKitToken = (
  room: string,
  identity: string,
  role: "host" | "participant",
  name: string // 👈 ADD THIS
) => {
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity,
      name, // 👈 THIS IS THE KEY LINE
    }
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

  return token.toJwt();
};
