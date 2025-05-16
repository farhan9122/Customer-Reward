export const logInfo = (message, data) => {
  console.log(`[INFO] ${message}`, data || "");
};
export const logError = (message, error) => {
  console.error(`[ERROR] ${message}`, error || "");
};
