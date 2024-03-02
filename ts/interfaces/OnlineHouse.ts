import { CommonConstant } from "./CommonConstant";
import { Label } from "./Label";
import { OnlineHouseImage } from "./OnlineHouseImage";
import { Product } from "./Product";
import { Tag } from "./Tag";
import { User } from "./User";

export interface OnlineHouse {
  id: number;

  // -- constant mode start ---
  color_info: CommonConstant;

  family_type_info: CommonConstant;

  house_style_info: CommonConstant;

  house_type_info: CommonConstant;

  area_space_info: CommonConstant;
  // -- constant mode end ---

  reason: string;

  main_display: boolean;

  is_this_month: boolean;

  this_month_order: number;

  wish_count: number;

  like_count: number;

  view_count: number;

  tags?: Tag[];

  product: Product;

  onlineHouseImages: OnlineHouseImage[];

  label: Label;

  status: number;

  requested_by: number;

  requester: User;

  managed_by: number;

  requested_at?: Date;

  rejected_at?: Date;

  liked: boolean;

  wished: boolean;

  approved_at?: Date;

  created_at?: Date;

  updated_at?: Date;
}
