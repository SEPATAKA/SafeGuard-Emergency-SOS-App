const API_URL = "http://127.0.0.1:8000/api";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      result.message ||
      (result.errors
        ? Object.values(result.errors).flat().join(", ")
        : "Registration failed");

    throw new Error(message);
  }

  return result;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

export async function getUser(token: string) {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to get user");
  }

  return result;
}

export async function getContacts(token: string) {
  const response = await fetch(`${API_URL}/contacts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to get contacts");
  }

  return result;
}

export async function triggerSOS(
  token: string,
  latitude: number,
  longitude: number
) {
  const response = await fetch(`${API_URL}/sos/trigger`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "SOS failed");
  }

  return result;
}