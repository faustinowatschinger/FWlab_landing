import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "FW Labs — Soluciones tecnológicas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/logo-fw-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
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
        {/* Original brand asset, preserved without recreating the mark. */}
        <img src={logoSrc} alt="FW Labs" width={224} height={80} />

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#60a5fa",
              fontSize: "21px",
              fontWeight: 600,
              letterSpacing: "2px",
              marginBottom: "26px",
            }}
          >
            SOFTWARE / INTEGRACIONES / AUTOMATIZACIÓN / IA
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
            Tecnología que resuelve problemas reales
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", color: "#94a3b8", fontSize: "27px", fontWeight: 600 }}>
            fwlabsllc.com
          </div>
          <div style={{ display: "flex", color: "#cbd5e1", fontSize: "24px" }}>
            {"Soluciones tecnológicas para empresas"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
