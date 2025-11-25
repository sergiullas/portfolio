// src/hooks/useActiveSection.js
import * as React from "react";

export function useActiveSection(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = React.useState(
    sectionIds?.[0] ?? null
  );

  React.useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const handleScroll = () => {
      let currentId = sectionIds[0];

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          currentId = id;
        }
      });

      setActiveSection(currentId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

export default useActiveSection;
