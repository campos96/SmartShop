import { API_URL, PRODUCT_CONDITIONS } from "../endpoints";
import AuthHeader from "./auth-header";

export const getProductConditions = () => {
  return fetch(API_URL + PRODUCT_CONDITIONS.LIST, {
    method: "GET",
    headers: AuthHeader(),
  }).then((response) => response.json());
};
