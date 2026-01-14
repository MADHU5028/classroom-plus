import { Router } from "express";
import { createMeeting, validateMeeting } from "../services/meetingService";

const router = Router();

router.post("/create", (req, res) => {
  const meetingId = createMeeting();
  res.json({ meetingId });
});

router.get("/:id", (req, res) => {
  res.json({ valid: validateMeeting(req.params.id) });
});

export default router;
