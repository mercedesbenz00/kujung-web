import { AgencyStoreImage } from "./AgencyStoreImage";
import { CommonConstant } from "./CommonConstant";

export interface AgencyStore {
  id: number;

  name: string;

  addr: string;

  addr_sub: string;

  zonecode: string;

  area_info: CommonConstant;

  phone: string;

  feature: string;

  is_gold: boolean;

  opening_hours: string;

  lng: number;

  lat: number;

  priority: number;

  image_url: string;

  image_url_mobile: string;

  agencyStoreImages: AgencyStoreImage[];

  created_at?: Date;

  updated_at?: Date;
}
