import { ImageResponse } from "next/og";

export const alt = "Muhammad Shahwaiz — AI Systems & Backend Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111318",
          color: "#F7F5EF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="420" height="110" viewBox="0 0 260 74">
          <path
            d="M250 14c-38-10-92-8-118 6-22 12-10 30 8 24 20-7 12-34-26-34C70 10 20 24 11 46c-1 3-1 9-1 28"
            stroke="#8EA6FF"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#8EA6FF", letterSpacing: 4, textTransform: "uppercase" }}>
            AI Systems &amp; Backend Engineering
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, marginTop: 18, lineHeight: 1 }}>
            Muhammad Shahwaiz
          </div>
          <div style={{ fontSize: 36, color: "#B4B6BD", marginTop: 26 }}>
            AI systems. Clear evidence. Human judgment.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
