export const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    window.location.href = "/auth";
  }
};

async function refreshToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Refresh token was rejected");
    }

    const newAuthData = await response.json();
    const newAccessToken = newAuthData.accessToken;
    localStorage.setItem("token", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    await logout();
    throw error;
  }
}

export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("token");

  options.headers = options.headers || {};
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }
  options.headers["Content-Type"] = "application/json";
  options.credentials = "include";

  let response = await fetch(url, options);
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshToken();
      options.headers["Authorization"] = `Bearer ${newAccessToken}`;

      console.log("Retrying request with new token...");
      response = await fetch(url, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return response;
};

const api = {
  get: (url, options = {}) => fetchWithAuth(url, { ...options, method: "GET" }),
  post: (body, url, options = {}) =>
    fetchWithAuth(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (body, url, options = {}) =>
    fetchWithAuth(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (url, options = {}) =>
    fetchWithAuth(url, { ...options, method: "DELETE" }),
};

export default api;
