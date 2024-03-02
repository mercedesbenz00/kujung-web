import { Product } from "./Product";

export interface ProductYoutube {
  id: number; // title, summary, url

  title: string;

  summary: string;

  url: string;

  thumb_url: string;

  product: Product;
}
