import { API_URL, PRODUCT_CATEGORIES } from "../endpoints";
import AuthHeader from "./auth-header";

export const getProductCategories = () => {
  return fetch(API_URL + PRODUCT_CATEGORIES.LIST, {
    method: "GET",
    headers: AuthHeader(),
  }).then((response) => response.json());
};
