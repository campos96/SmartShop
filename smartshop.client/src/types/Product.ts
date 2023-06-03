import { ProductCategory } from "./ProductCategory";
import { ProductCondition } from "./ProductCondition";

export type Product = {
  id: string;
  name: string;
  model: string;
  brand: string;
  sku: string;
  categoryId: string;
  productConditionId: string;
  created: Date;
  updated: Date;
  category: ProductCategory;
  condition: ProductCondition;
};
