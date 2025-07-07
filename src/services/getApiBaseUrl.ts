declare global {
  interface Window {
    REACT_APP_CONFIG?: {
      API_BASE_URL: string;
    };
  }
}

export function getApiBaseUrl(): string {
  const baseUrl = window.REACT_APP_CONFIG?.API_BASE_URL;
  if (!baseUrl) {
    throw new Error('REACT_APP_API_BASE_URL is not defined in config.js');
  }
  return baseUrl;
}
