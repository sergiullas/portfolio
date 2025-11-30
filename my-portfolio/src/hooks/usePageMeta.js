// src/hooks/usePageMeta.js
import { useEffect } from "react";

/**
 * Simple per-page meta management:
 * - Updates document.title
 * - Updates (or creates) <meta name="description"> in <head>
 */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let meta =
        document.querySelector('meta[name="description"]') ||
        createDescriptionMeta();

      const previous = meta.getAttribute("content") || "";
      meta.setAttribute("content", description);

      // Optional: restore previous on unmount
      return () => {
        meta.setAttribute("content", previous);
      };
    }
  }, [title, description]);
}

function createDescriptionMeta() {
  const meta = document.createElement("meta");
  meta.name = "description";
  document.head.appendChild(meta);
  return meta;
}
