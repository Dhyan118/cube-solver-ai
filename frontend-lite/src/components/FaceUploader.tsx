import React, { useState } from "react";
import ColorGrid from "./ColorGrid";
import { analyzeFace } from "../api";
import { FaceKey, FaceData } from "../types";

export default function FaceUploader({
  label, faceKey, onDone
}: {
  label: string; faceKey: FaceKey;
  onDone: (key: FaceKey, data: FaceData) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [colors, setColors] = useState<string[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr(null);
    setPreview(URL.createObjectURL(f));
    setBusy(true);
    try {
      const data = await analyzeFace(faceKey, f);
      const payload: FaceData = {
        stickers: data.stickers,
        center: data.center,
        hsv_center: data.hsv_center,
      };
      setColors(payload.stickers);
      onDone(faceKey, payload);
    } catch (e:any) {
      setErr(e?.message || "Analyze failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{
      background:"rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(15px)",
      border:"1px solid rgba(255,255,255,0.3)",
      borderRadius:16,
      padding:16,
      transition: "all 0.3s ease",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 style={{
          margin:0,
          fontWeight:600,
          textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
        }}>📷 {label}</h3>
        {busy && (
          <span style={{
            opacity:.9,
            fontSize:12,
            background: "rgba(59, 130, 246, 0.3)",
            padding: "4px 8px",
            borderRadius: "8px",
            border: "1px solid rgba(59, 130, 246, 0.5)",
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
          }}>
            🔄 Analyzing…
          </span>
        )}
      </div>
      <div style={{display:"flex",gap:12,alignItems:"center",marginTop:12}}>
        <label style={{
          cursor:"pointer",
          padding:"8px 16px",
          borderRadius:12,
          background:"linear-gradient(135deg, #243b6b, #1e40af)",
          color: "white",
          fontWeight: "500",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 8px rgba(36, 59, 107, 0.5)",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
        }}>
          <input type="file" accept="image/*" onChange={onFile} hidden />
          📤 Upload
        </label>
        {preview && (
          <img 
            src={preview} 
            alt={label} 
            style={{
              width:72,
              height:72,
              objectFit:"cover",
              borderRadius:12,
              border: "2px solid rgba(255,255,255,0.3)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
            }} 
          />
        )}
        {colors && <ColorGrid colors={colors} />}
      </div>
      {err && (
        <div style={{
          color:"#ff8080",
          fontSize:12,
          marginTop:8,
          background: "rgba(255, 128, 128, 0.2)",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid rgba(255, 128, 128, 0.4)",
          textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
        }}>
          ⚠️ {err}
        </div>
      )}
      <div style={{
        opacity:.9,
        fontSize:12,
        marginTop:8,
        background: "rgba(59, 130, 246, 0.2)",
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid rgba(59, 130, 246, 0.4)",
        textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
      }}>
        💡 Tip: hold the face flat in good lighting.
      </div>
    </div>
  );
}
