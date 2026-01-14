import { useParticipants } from "@livekit/components-react";
import { useState } from "react";

export default function ParticipantsPanel() {
  const participants = useParticipants();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span>Participants ({participants.length})</span>

        <div>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "▢" : "–"}
          </button>
          <button>⋮</button>
        </div>
      </div>

      {!collapsed && (
        <div style={styles.list}>
          {participants.map((p) => (
            <div key={p.identity} style={styles.item}>
              <div style={styles.avatar}>
                {p.identity[0]?.toUpperCase()}
              </div>
              <div>
                <div>{p.identity}</div>
                <div style={styles.role}>
                  {JSON.parse(p.metadata || "{}")?.role || "Student"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const styles = {
  panel: {
    position: "absolute" as const,
    right: 20,
    top: 80,
    width: 280,
    background: "rgba(15,23,42,0.96)",
    borderRadius: 18,
    padding: 12,
    color: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  list: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
  },
  item: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  role: {
    fontSize: 12,
    color: "#94a3b8",
  },
};
