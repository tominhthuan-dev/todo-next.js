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