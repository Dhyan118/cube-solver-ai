import React, { useEffect, useMemo, useState } from "react";
import FaceUploader from "./components/FaceUploader";
import ColorGrid from "./components/ColorGrid";
import { FaceKey, FaceData, CubeFaces, UI_ORDER } from "./types";
import { health, solveCube } from "./api";

export default function App() {
  const [faces, setFaces] = useState<CubeFaces>({});
  const [moves, setMoves] = useState<string[] | null>(null);
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const completed = useMemo(() => Object.keys(faces).length, [faces]);
  const allReady = completed === 6;

  useEffect(() => { health().then(ok => setApiOk(ok)).catch(()=>setApiOk(false)); }, []);

  function onDone(key: FaceKey, data: FaceData) {
    setFaces(prev => ({ ...prev, [key]: data }));
  }

  async function onSolve() {
    setMoves(null);
    try {
      const res = await solveCube(faces);
      setMoves(res.moves);
    } catch (e:any) {
      alert(e?.message || "Solve failed");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      color: "#fff",
      fontFamily: "ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial"
    }}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:16}}>
        <header style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          margin:"12px 0 8px",
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(15px)",
          borderRadius: "16px",
          padding: "16px",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
        }}>
          <h1 style={{
            margin:0,
            fontSize:22,
            fontWeight:700,
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            background: "linear-gradient(135deg, #fff, #e0e7ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>🧩 AI Rubik's Cube Solver (Lite)</h1>
          <div style={{
            fontSize:12,
            opacity:.9,
            background: "rgba(0,0,0,0.6)",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            API: {apiOk===null ? "checking…" : apiOk ? "connected ✅" : "offline ❌"}
          </div>
        </header>

        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
          <aside style={{
            background:"rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(15px)",
            border:"1px solid rgba(255,255,255,0.3)",
            borderRadius:16,
            padding:16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
          }}>
            <h3 style={{
              marginTop:0,
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
            }}>📊 Capture Progress</h3>
            <ul style={{listStyle:"none",padding:0,margin:0,display:"grid",gap:8}}>
              {UI_ORDER.map(({label, key}) => {
                const done = !!faces[key as FaceKey];
                return (
                  <li key={key} style={{
                    display:"flex",
                    alignItems:"center",
                    gap:8,
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: done ? "rgba(52, 211, 153, 0.2)" : "rgba(156, 163, 175, 0.1)",
                    border: done ? "1px solid rgba(52, 211, 153, 0.4)" : "1px solid rgba(156, 163, 175, 0.2)"
                  }}>
                    <span style={{
                      width:10,height:10,borderRadius:9999,
                      background: done ? "#34d399" : "#9ca3af",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                    }}/>
                    <span style={{
                      textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                      fontWeight: done ? "600" : "400"
                    }}>{label}</span>
                  </li>
                );
              })}
            </ul>
            <div style={{
              fontSize:12,
              opacity:.9,
              marginTop:8,
              textAlign: "center",
              background: "rgba(0,0,0,0.6)",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)"
            }}>
              {completed} of 6 completed
            </div>
            <div style={{marginTop:12}}>
              {allReady ? (
                <button onClick={onSolve} style={{
                  padding:"10px 14px",
                  borderRadius:12,
                  background:"linear-gradient(135deg, #4f46e5, #7c3aed)",
                  color:"#fff",
                  border:"none",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.6)",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
                }}>
                  🎯 Solve Cube
                </button>
              ) : (
                <button disabled style={{
                  padding:"10px 14px",
                  borderRadius:12,
                  opacity:.6,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.6)"
                }}>
                  Upload all faces to enable Solve
                </button>
              )}
            </div>
            {moves && (
              <div style={{marginTop:12}}>
                <h4 style={{
                  margin:"12px 0 6px",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
                }}>📋 Moves</h4>
                <ol style={{
                  paddingLeft:18,
                  display:"grid",
                  gap:4,
                  background: "rgba(0,0,0,0.6)",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}>
                  {moves.map((m,i)=><li key={i} style={{
                    fontFamily:"ui-monospace, SFMono-Regular",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
                  }}>{m}</li>)}
                </ol>
              </div>
            )}
          </aside>

          <section style={{display:"grid",gap:12}}>
            {UI_ORDER.map(({label, key}) => (
              <FaceUploader key={key} label={label} faceKey={key as FaceKey} onDone={onDone} />
            ))}

            {/* quick recap of captured colors */}
            {completed > 0 && (
              <div style={{
                background:"rgba(0, 0, 0, 0.85)",
                backdropFilter: "blur(15px)",
                border:"1px solid rgba(255,255,255,0.3)",
                borderRadius:16,
                padding:16,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
              }}>
                <h3 style={{
                  marginTop:0,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
                }}>🎨 Captured Colors</h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3, minmax(0,1fr))",gap:12}}>
                  {Object.entries(faces).map(([k,v]) => (
                    <div key={k}>
                      <div style={{
                        opacity:.9,
                        marginBottom:6,
                        textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                        fontWeight: "600"
                      }}>{k}</div>
                      <ColorGrid colors={v!.stickers} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
