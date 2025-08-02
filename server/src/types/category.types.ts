export interface ICategory {
  name: string;
  image: string;
  subcategories: string[];
  createdAt?: Date;
  updatedAt?: Date;
}