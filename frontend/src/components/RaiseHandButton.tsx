type Props = {
  raised: boolean;
  onToggle: () => void;
};

export default function RaiseHandButton({ raised, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: raised ? "#fbbc04" : "transparent",
        color: raised ? "#000" : "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: "20px",
        cursor: "pointer",
      }}
    >
      ✋ {raised ? "Hand Raised" : "Raise Hand"}
    </button>
  );
}
