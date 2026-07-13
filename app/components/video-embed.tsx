"use client";

/**
 * Reproductor embebido responsive (16:9) para YouTube o Vimeo.
 * Pegá la URL tal cual la copiás del navegador; el componente extrae el ID solo.
 * Soporta: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, vimeo.com/, player.vimeo.com/video/
 */

function buildEmbedSrc(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  // YouTube
  const yt =
    trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) ??
    trimmed.match(/[?&]v=([\w-]{11})/);
  if (yt) {
    return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1&playsinline=1`;
  }

  // Vimeo
  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1`;
  }

  return null;
}

export default function VideoEmbed({ url, title = "Video" }: { url: string; title?: string }) {
  const src = buildEmbedSrc(url);

  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-surface-dark px-6 text-center">
        <p className="text-sm text-slate-300">
          Falta cargar la URL del video (YouTube no listado o Vimeo) en{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">app/caso/page.tsx</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full bg-black">
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
