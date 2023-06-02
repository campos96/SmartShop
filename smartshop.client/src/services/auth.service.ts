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
      if (json.accessToken) {
        localStorage.setItem("AccessToken", json.accessToken);
        localStorage.setItem("UserFullName", json.userFullName);
        var expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + json.expiresIn);
        localStorage.setItem(
          "AccessTokenExpiration",
          expirationDate.getTime().toString()
        );
      }

      return json;
    });
};

export const authUser = () => {
  const accessToken = localStorage.getItem("AccessToken");
  const accessTokenExpiration = localStorage.getItem("AccessTokenExpiration");
  const userFullName = localStorage.getItem("UserFullName");

  if (!accessToken || !accessTokenExpiration || !userFullName) {
    return null;
  }

  if (parseInt(accessTokenExpiration) <= new Date().getTime()) {
    return null;
  }
  
  return {
    identity: {
      name: userFullName,
    },
  };
};

export const logout = () => {
  localStorage.removeItem("User");
};
