import { API_URL, PRODUCT } from "../endpoints";
import AuthHeader from "./auth-header";

export const getProducts = () => {
  return fetch(API_URL + PRODUCT.LIST, {
    method: "GET",
    headers: AuthHeader(),
  }).then((response) => response.json());
};
