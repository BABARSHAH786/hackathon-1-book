import React, { useState, useEffect } from "react";

export default function AskWithAIButton({ onAsk }) {
  const [selectedText, setSelectedText] = useState("");
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseUp = (e) => {
      const text = window.getSelection().toString().trim();

      if (text.length > 0) {
        setSelectedText(text);
        setPos({ x: e.pageX, y: e.pageY });
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => onAsk(selectedText)}
      style={{
        position: "absolute",
        top: pos.y + 8,
        left: pos.x,
        background: "#1a73e8",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      Ask with AI
    </button>
  );
}
