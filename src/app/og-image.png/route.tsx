import { ImageResponse } from "next/og";
import { personalInfo } from "@/data";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        background: "linear-gradient(135deg, #001B2E 45%, #294C60 100%)",
        color: "#FFF5EC",
        padding: 80,
      }}>
        <div style={{ width: 80, height: 5, background: "#FFC49B", marginBottom: 36 }} />
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -4 }}>
          {personalInfo.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#FFC49B", marginTop: 12 }}>
          Freelance web developer in Toronto
        </div>
        <div style={{ display: "flex", fontSize: 27, color: "#E8EEF2", marginTop: 44 }}>
          Websites &amp; booking &nbsp;·&nbsp; Technical SEO &nbsp;·&nbsp; Email automation
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
