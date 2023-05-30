import { API_URL, PATHS } from "../endpoints";
import AuthHeader from "./auth-header";

export const getProducts = () => {
  return fetch(API_URL + PATHS.PRODUCT_LIST, {
    method: "GET",
    headers: AuthHeader(),
  }).then((response) => response.json());
};
