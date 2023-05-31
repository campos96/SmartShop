export default function AuthHeader() {
  const userStr = localStorage.getItem("User");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return { Authorization: "" };
  }
}
