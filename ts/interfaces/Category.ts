import { CategoryImage } from "./CategoryImage";
import { CategoryYoutube } from "./CategoryYoutube";

export interface Category {
  id: number;

  name: string;
  children: Category[];

  parent: Category;

  parentId: number;

  seq: number;

  depth: number;

  image_url: string;

  desc: string;

  hidden: boolean;

  categoryImages: CategoryImage[];

  categoryYoutubes: CategoryYoutube[];

  tags: string;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;

  selected: boolean;

  
  minPrice: number | undefined; // 프론트에서 사용하기 위해 추가.
  
  maxPrice: number | undefined; // 프론트에서 사용하기 위해 추가.
}
