import { HouseEntity } from "../constants";
import { Category } from "./Category";
import { CommonConstant } from "./CommonConstant";

export interface House {
  entity_type: HouseEntity;
  id: number;
  title: string;
  thumb_url: string;
  images: string[];
  status: number;
  tags: string[];
  requested_at: Date;
  approved_at: Date;
  rejected_at: Date;
  product_name: string;
  requester_name: string;
  requester_nick_name: string;
  requester_company_name: string;
  requester_photo: string;
  updated_at: Date;
  color_info: CommonConstant;
  family_type_info: CommonConstant;
  house_style_info: CommonConstant;
  house_type_info: CommonConstant;
  area_space_info: CommonConstant;
  category_level1: Category;
  category_level2: Category;
  wished: boolean;
  liked: boolean;
}
