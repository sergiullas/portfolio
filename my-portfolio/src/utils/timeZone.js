// utils/timeZone.js
export function computeTimeDiff(targetTZ = "America/New_York") {
  try {
    const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();

    const toTzDate = (tz) =>
      new Date(now.toLocaleString("en-US", { timeZone: tz }));

    const targetDate = toTzDate(targetTZ);
    const userDate = toTzDate(userTZ);

    const diffMs = targetDate - userDate;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));

    if (diffHours === 0) return "Same time";
    if (diffHours > 0) return `${diffHours}h ahead`;
    return `${Math.abs(diffHours)}h behind`;
  } catch {
    return "";
  }
}
