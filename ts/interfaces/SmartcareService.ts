import { SmartcareServiceImage } from "./SmartcareServiceImage";
import { SmartcareServiceMemo } from "./SmartcareServiceMemo";
import { User } from "./User";

export interface SmartcareService {
  id: number;

  requester: User;

  know_from: string;

  name: string;

  phone: string;

  addr: string;

  addr_sub: string;

  zonecode: string;

  desired_services: string;

  current_floor: string;

  area_range: string;

  contact_time: string;

  product_name: string;

  special_note: string;

  status?: number;

  quote_url: string;

  smartcareServiceImages: SmartcareServiceImage[];

  smartcareServiceMemos: SmartcareServiceMemo[];

  created_at?: Date;

  updated_at?: Date;
}
