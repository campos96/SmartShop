export default function AuthHeader() {
  const accessToken = localStorage.getItem("AccessToken");

  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return { Authorization: "" };
  }
}
