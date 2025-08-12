import React from "react";
export default function ColorGrid({ colors, size = 28 }: { colors: string[]; size?: number; }) {
  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(3,1fr)",
      gap:6,
      background: "rgba(0,0,0,0.3)",
      padding: "8px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.1)"
    }}>
      {colors.map((hex, i) => (
        <div 
          key={i} 
          title={`${hex} (Position ${i})`}
          style={{
            width:size,
            height:size,
            background:hex,
            borderRadius:6,
            border:"2px solid rgba(255,255,255,0.3)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            transition: "all 0.2s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
          }}
        />
      ))}
    </div>
  );
}
