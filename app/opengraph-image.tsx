import { ImageResponse } from "next/og";

export const alt = "FW Assistant — Agente de IA para inmobiliarias que responde y agenda tus leads";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f172a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "68px",
              height: "68px",
              borderRadius: "18px",
              background: "#2563eb",
              color: "#ffffff",
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            FW
          </div>
          <div style={{ display: "flex", color: "#ffffff", fontSize: "32px", fontWeight: 700 }}>
            FW Labs
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#60a5fa",
              fontSize: "26px",
              fontWeight: 600,
              letterSpacing: "4px",
              marginBottom: "26px",
            }}
          >
            AGENTE DE IA PARA INMOBILIARIAS
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "70px",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: "1010px",
            }}
          >
            Responde, califica y agenda tus leads. Vos cerrás.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", color: "#94a3b8", fontSize: "27px", fontWeight: 600 }}>
            fwlabsllc.com
          </div>
          <div style={{ display: "flex", color: "#cbd5e1", fontSize: "24px" }}>
            {"Responde en < 2 min · las 24 horas"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
