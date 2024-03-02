import { CommonConstant } from "./CommonConstant";
import { User } from "./User";

enum Gender {
  Male = 'M',
  Female = 'F',
}

export interface Profile {
  id: number;

  gender: Gender;

  user: User;

  age_range_info: CommonConstant;

  color_info: CommonConstant;

  area_space_info: CommonConstant;

  house_type_info: CommonConstant;

  family_type_info: CommonConstant;

  house_styles?: CommonConstant[];

  interior_feeling_info: CommonConstant;

  join_reason: string;

  show_private_privacy: boolean;

  photo: string;
}
