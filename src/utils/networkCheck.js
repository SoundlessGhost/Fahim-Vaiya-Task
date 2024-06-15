export const isOnline = () => {
  return typeof navigator !== "undefined" && navigator.onLine;
};
