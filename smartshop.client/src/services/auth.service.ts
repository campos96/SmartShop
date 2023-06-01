import { API_URL, ACCOUNT } from "../endpoints";

export const login = (username: string, password: string) => {
  return fetch(API_URL + ACCOUNT.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8;",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.authenticationResult.accessToken) {
        localStorage.setItem("User", JSON.stringify(json.authenticationResult));
      }
      return json.authenticationResult;
    });
};

export const authUser = () => {
  const userString = localStorage.getItem("User");
  var user = null;

  if (userString) {
    user = JSON.parse(userString);
    if (!user.account) {
      return null;
    }
  }
  return user;
};

export const logout = () => {
  localStorage.removeItem("User");
};
