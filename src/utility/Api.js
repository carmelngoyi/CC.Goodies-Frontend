export async function apiFetch(endpoint, options = {}) {
  const urlParams = new URLSearchParams(window.location.search);
  const ip = urlParams.get("ip") || localStorage.getItem("forcedIp");

  const baseURL = process.env.REACT_APP_API_URL;
  const url = new URL(endpoint, baseURL);

  if (ip && !url.searchParams.get("ip")) {
    url.searchParams.set("ip", ip);
  }

  return fetch(url.toString(), options);
}
