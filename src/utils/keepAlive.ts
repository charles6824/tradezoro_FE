// Optional: Add this to keep backend alive from frontend
// Place in src/utils/keepAlive.ts

const BACKEND_URL = import.meta.env.VITE_API_URL;
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes

export const startKeepAlive = () => {
  setInterval(async () => {
    try {
      await fetch(`${BACKEND_URL}/api/health`);
    } catch (error) {
      // Silent fail
    }
  }, PING_INTERVAL);
};

// Call in main.tsx: startKeepAlive();
