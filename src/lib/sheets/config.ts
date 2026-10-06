export type SheetsConfig = {
  webAppUrl: string;
  secret?: string;
};

export function getSheetsConfig(): SheetsConfig | null {
  const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim();
  if (!webAppUrl) return null;

  if (process.env.GOOGLE_SHEETS_SYNC_ENABLED === "false") return null;

  return {
    webAppUrl,
    secret: process.env.GOOGLE_SHEETS_SECRET?.trim() || undefined,
  };
}

export function hasSheetsConfig() {
  return getSheetsConfig() !== null;
}
