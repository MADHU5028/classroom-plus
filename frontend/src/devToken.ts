import { AccessToken } from "livekit-server-sdk";

export async function createToken(room: string, name: string): Promise<string> {
  const at = new AccessToken(
    "classroomplus_dev_key",
    "classroomplus_super_secret_key_1234567890",
    { identity: name }
  );

  at.addGrant({ room, roomJoin: true });
  return at.toJwt();
}
