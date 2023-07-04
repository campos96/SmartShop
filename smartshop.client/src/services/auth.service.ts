import { API_URL, ACCOUNT } from "../endpoints";
import AuthenticationResult from "../types/AuthenticationResult";
import { Signup } from "../classes/Signup";
import request from "./request.service";

export const signup = (signup: Signup) => {
  return request(API_URL + ACCOUNT.SIGNUP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8;",
    },
    body: JSON.stringify({ ...signup }),
  }).then((response) => {
    return response;
  });
};

export const login = (username: string, password: string) => {
  return request(API_URL + ACCOUNT.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8;",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((response) => {
    var authResult = response.payload as AuthenticationResult;
    if (authResult) {
      localStorage.setItem("AccessToken", authResult.accessToken);
      localStorage.setItem("UserFullName", authResult.userFullName);
      localStorage.setItem("Shop", JSON.stringify(authResult.shop));
      var expirationDate = new Date();
      expirationDate.setSeconds(
        expirationDate.getSeconds() + authResult.expiresIn
      );
      localStorage.setItem(
        "AccessTokenExpiration",
        expirationDate.getTime().toString()
      );
    }
    return response;
  });
};

export const authorizedUser = () => {
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

export const selectedShop = () => {
  const shopString = localStorage.getItem("Shop");

  if (!shopString) {
    return null;
  }

  return JSON.parse(shopString);
};

export const logout = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("AccessTokenExpiration");
  localStorage.removeItem("UserFullName");
  localStorage.removeItem("Shop");
};
