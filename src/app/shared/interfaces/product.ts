import { Category } from './category';
import { Subcategory } from './subcategory';
import { brand } from './brand';
export interface product {
  count?:number,
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}







