export async function apiFetch(endpoint, options = {}) {
  const baseURL = "http://54.226.0.228:3000";
  const url = new URL(endpoint, baseURL);

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
