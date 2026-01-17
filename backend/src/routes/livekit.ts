import { Router } from "express";
import { createLiveKitToken } from "../utils/livekitToken";

const router = Router();

router.post("/token", async (req, res) => {
  const { room, identity, role , name } = req.body;

  const jwt = await createLiveKitToken(
    room,
    identity,
    role || "participant",
    name || identity
  );

  res.json({ token: jwt });
});


export default router;
