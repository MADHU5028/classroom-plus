import { useState } from "react";

export function useRaiseHand() {
  const [raised, setRaised] = useState(false);

  const toggle = () => {
    setRaised((prev) => !prev);
  };

  return {
    raised,
    toggle,
  };
}
