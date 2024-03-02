import { Category } from "./Category";
import { CommonConstant } from "./CommonConstant";
import { ProductBlog } from "./ProductBlog";
import { ProductImage } from "./ProductImage";
import { ProductYoutube } from "./ProductYoutube";
import { Tag } from "./Tag";

export interface Product {
  id: number;

  title: string;

  category_level1: Category;

  category_level2: Category;

  category_level3: Category;

  construction_law: string;

  size_w: number;

  size_l: number;

  size_t: number;

  desc: string;

  color_info: CommonConstant;

  house_style_info: CommonConstant;

  area_space_info: CommonConstant;

  house_type_info: CommonConstant;

  family_type_info: CommonConstant;

  tags?: Tag[];

  similarProducts?: Product[];

  thumbnail_url: string;

  detail_info: string;

  productImages: ProductImage[];

  productBlogs: ProductBlog[];

  productYoutube: ProductYoutube;

  selected_icons: string;

  hidden: boolean;

  recommended: boolean;

  top_fixed: boolean;

  wish_count: number;

  view_count: number;

  wished: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
