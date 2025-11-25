// src/hooks/useLocalTime.js
import * as React from "react";

export function useLocalTime(timeZone) {
  const [localTime, setLocalTime] = React.useState("");

  React.useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
        ...(timeZone ? { timeZone } : {}),
      }).format(new Date());

    setLocalTime(format());
    const id = window.setInterval(() => setLocalTime(format()), 60_000);

    return () => window.clearInterval(id);
  }, [timeZone]);

  return localTime;
}
