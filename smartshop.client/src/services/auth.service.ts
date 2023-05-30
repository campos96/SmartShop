import { API_URL, PATHS } from "../endpoints";

export const login = (username: string, password: string) => {
  return fetch(API_URL + PATHS.LOGIN, {
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
        console.log('logged');
        localStorage.setItem("user", JSON.stringify(json.authenticationResult));
      }
      return json.authenticationResult;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};
