let baseUrl;

if (window.location.hostname === "localhost") {
  // For local environment
  baseUrl = process.env.REACT_APP_LOCAL_URL;
} else {
  // For live environment
  baseUrl = process.env.REACT_APP_LIVE_URL;
}

export default baseUrl;
