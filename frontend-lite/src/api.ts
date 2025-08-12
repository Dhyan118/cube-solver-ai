import { CubeFaces, FaceKey } from "./types";

const BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8000";

export async function analyzeFace(face: FaceKey, file: File) {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${BASE}/analyze_face?face=${face}`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function solveCube(faces: CubeFaces) {
  const res = await fetch(`${BASE}/solve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ faces }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function health() {
  const res = await fetch(`${BASE}/`);
  return res.ok;
}
