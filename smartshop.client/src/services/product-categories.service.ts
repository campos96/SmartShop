import { API_URL, PRODUCT_CATEGORIES } from "../endpoints";
import { Category } from "../types/Category";
import AuthHeader from "./auth-header";

export const getProductCategories = () => {
  return fetch(API_URL + PRODUCT_CATEGORIES.LIST, {
    method: "GET",
    headers: AuthHeader(),
  }).then((response) => response.json());
};

export const addProductCategory = (productCategory: Category) => {
  return fetch(API_URL + PRODUCT_CATEGORIES.ADD, {
    method: "POST",
    headers: {
      Authorization: AuthHeader().Authorization,
      "Content-Type": "application/json; charset=UTF-8;",
    },
    body: JSON.stringify({
      shopId: productCategory.shopId,
      name: productCategory.name,
      description: productCategory.description,
    }),
  }).then((response) => response.json());
};

export default getProductCategories;
