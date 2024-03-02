import { CommonConstant } from "./CommonConstant";
import { Label } from "./Label";
import { Product } from "./Product";
import { Tag } from "./Tag";
import { User } from "./User";

export interface ExpertHouse {
  id: number;

  // -- constant mode start ---
  color_info: CommonConstant;

  family_type_info: CommonConstant;

  house_style_info: CommonConstant;

  house_type_info: CommonConstant;

  // -- constant mode end ---

  reason: string;

  main_display: boolean;

  is_this_month: boolean;

  this_month_order: number;

  wish_count: number;

  like_count: number;

  view_count: number;

  image_url: string;

  thumb_url: string;

  building_addr: string;

  title: string;

  content: string;

  tags?: Tag[];

  product: Product;

  label: Label;

  status: number;

  requested_by: number;

  requester: User;

  managed_by: number;

  requested_at?: Date;

  rejected_at?: Date;

  approved_at?: Date;

  liked: boolean;

  wished: boolean;

  created_at?: Date;

  updated_at?: Date;
}
