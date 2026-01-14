import { Router } from "express";
import { createLiveKitToken } from "../utils/livekitToken";

const router = Router();

router.post("/token", async (req, res) => {
  const { room, identity, role } = req.body;

  const jwt = await createLiveKitToken(
    room,
    identity,
    role || "participant"
  );

  res.json({ token: jwt });
});


export default router;
