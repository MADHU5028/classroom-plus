interface Props {
  name: string;
  micOn: boolean;
  isActive?: boolean;
}

export default function ParticipantTile({ name, micOn, isActive }: Props) {
  return (
    <div className={`tile ${isActive ? "active" : ""}`}>
      <div className="avatar">{name[0]}</div>
      <div className="name">
        {name} {micOn ? "" : "🔇"}
      </div>
    </div>
  );
}
