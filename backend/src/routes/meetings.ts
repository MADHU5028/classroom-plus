import { Router } from "express";
import {
  createMeeting,
  validateMeeting,
} from "../services/meetingService";

const router = Router();

/* CREATE MEETING */
router.post("/create", (req, res) => {
  try {
    const meetingId = createMeeting();
    return res.status(200).json({ meetingId });
  } catch (err) {
    console.error("Create meeting failed:", err);
    return res.status(500).json({ error: "Failed to create meeting" });
  }
});

/* VALIDATE MEETING */
router.get("/:id", (req, res) => {
  try {
    const valid = validateMeeting(req.params.id);
    return res.status(200).json({ valid });
  } catch (err) {
    console.error("Validate meeting failed:", err);
    return res.status(500).json({ valid: false });
  }
});

export default router;
