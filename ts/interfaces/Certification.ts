import { CommonConstant } from "./CommonConstant";

export interface Certification {
  id: number;

  title: string;

  variety: string;

  product_name: string;

  authority: string;

  certification_type_info: CommonConstant;

  attachment_file: string;

  thumb_url: string;

  thumb_url_mobile: string;

  start_at?: Date;

  end_at?: Date;

  created_at?: Date;

  updated_at?: Date;
}
