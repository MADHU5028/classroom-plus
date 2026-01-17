import axios from "axios";

const API_BASE = "http://localhost:5000/api/meetings";

export const createMeeting = async (): Promise<string> => {
  try {
    const res = await axios.post(`${API_BASE}/create`);
    return res.data.meetingId;
  } catch (err) {
    console.error("Create meeting failed:", err);
    throw err;
  }
};

export const validateMeeting = async (code: string): Promise<boolean> => {
  try {
    const res = await axios.get(`${API_BASE}/${code}`);
    return res.data.valid;
  } catch {
    return false;
  }
};
