export const logEvent = (message) => {
    console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
  };