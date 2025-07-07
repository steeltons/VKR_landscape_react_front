interface ReactAppConfig {
  API_BASE_URL: string;
}

interface Window {
  REACT_APP_CONFIG?: ReactAppConfig;
}
