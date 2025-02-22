import { Subcategory } from "./subcategory";
import { Category } from "./category";
export interface cartProduct {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface Product {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
};