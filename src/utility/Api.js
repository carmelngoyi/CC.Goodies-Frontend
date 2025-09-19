export async function apiFetch(endpoint, options = {}) {
  // Use environment variable or default to localhost
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000/';
  const url = new URL(endpoint, baseURL);
  return fetch(url.toString(), options);
}
