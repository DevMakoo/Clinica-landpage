import { ImageResponse } from "next/og";
import { clinic } from "@/data/clinic";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${clinic.name} — ${clinic.tagline}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#123c36",
          padding: "96px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div style={{ width: 40, height: 2, backgroundColor: "#c9a878" }} />
          <span
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.7)",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {clinic.specialty}
          </span>
        </div>
        <span
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          {clinic.name}
        </span>
        <span
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.85)",
            fontSize: 34,
            maxWidth: 840,
          }}
        >
          {clinic.tagline}
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
