import { Category } from "./Category";
import { Condition } from "./Condition";

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
  category: Category;
  condition: Condition;
};
