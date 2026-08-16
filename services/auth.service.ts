export interface LoginResponse {
  user: {
    id: number;
    username: string;
    role: string;
  };

  accessToken: string;

  refreshToken: string;
}


export async function loginApi(
  username: string,
  password: string
): Promise<LoginResponse> {

  const response = await fetch("/api/auth/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });


  if (!response.ok) {

    const errorData =
      await response.json();

    throw new Error(
      errorData.message ||
      "Đăng nhập thất bại"
    );
  }


  return response.json();
}


export async function logout() {
  const accessToken =
    localStorage.getItem("accessToken");

  try {
    if (accessToken) {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }
}