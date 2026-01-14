const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const SEGMENT_LENGTHS = [3, 4, 3];

const randomSegment = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += ALPHABET.charAt(
      Math.floor(Math.random() * ALPHABET.length)
    );
  }
  return result;
};

export const generateMeetingCode = (): string => {
  return SEGMENT_LENGTHS.map(randomSegment).join("-");
};
