import { Product } from "./Product";

export interface ProductImage {
  id: number;

  image_url: string;

  product: Product;
}
