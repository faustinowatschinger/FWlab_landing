"use client";

import { useEffect } from "react";

export default function CalendlyEmbed({
  url,
  className = "h-[700px]",
}: {
  url: string;
  className?: string;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={`calendly-inline-widget ${className}`}
      data-url={url}
      style={{ minWidth: "320px" }}
    />
  );
}
