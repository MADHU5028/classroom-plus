import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/api/meetings";

export const createMeeting = async (): Promise<string> => {
  const res = await axios.post(`${API_BASE}/create`);
  return res.data.meetingId;
};

export const validateMeeting = async (code: string): Promise<boolean> => {
  const res = await axios.get(`${API_BASE}/${code}`);
  return res.data.valid;
};
