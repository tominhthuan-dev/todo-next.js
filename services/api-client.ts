import BASE_URL from "./api";

export async function apiClient(
  url: string,
  options: RequestInit = {}
) {
  const accessToken =localStorage.getItem("accessToken");

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set(
      "Authorization",
      `Bearer ${accessToken}`
    );
  }

  let response = await fetch(
    `${BASE_URL}${url}`,
    {
      ...options,
      headers,
    }
  );

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh Token không tồn tại");
    }

    const refreshResponse =
      await fetch(`${BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({refreshToken}),
        }
      );

    if (!refreshResponse.ok) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken");

      throw new Error( "Session expired");
    }

    const data =await refreshResponse.json();

    localStorage.setItem(
      "accessToken",
      data.accessToken
    );

    headers.set(
      "Authorization",
      `Bearer ${data.accessToken}`
    );

    response = await fetch(
      `${BASE_URL}${url}`,
      {
        ...options,
        headers,
      }
    );
  }

  return response;
}