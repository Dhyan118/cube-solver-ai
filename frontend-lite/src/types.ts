export type FaceKey = "U" | "R" | "F" | "D" | "L" | "B";
export type FaceData = {
  stickers: string[];         // 9 hex colors
  center: string;
  hsv_center: [number, number, number];
};
export type CubeFaces = Partial<Record<FaceKey, FaceData>>;

export const UI_ORDER = [
  { label: "Front Face",  key: "F" as FaceKey },
  { label: "Back Face",   key: "B" as FaceKey },
  { label: "Left Face",   key: "L" as FaceKey },
  { label: "Right Face",  key: "R" as FaceKey },
  { label: "Top Face",    key: "U" as FaceKey },
  { label: "Bottom Face", key: "D" as FaceKey },
];
