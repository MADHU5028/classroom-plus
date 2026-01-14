import { generateMeetingCode } from "../utils/generateMeetingCode";

interface Meeting {
  id: string;
  createdAt: number;
}

const meetings = new Map<string, Meeting>();

export const createMeeting = () => {
  let id = generateMeetingCode();
  while (meetings.has(id)) {
    id = generateMeetingCode();
  }

  meetings.set(id, { id, createdAt: Date.now() });
  return id;
};

export const validateMeeting = (id: string) => {
  return meetings.has(id);
};
