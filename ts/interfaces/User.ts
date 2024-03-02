import { Profile } from "./Profile";
import { Role } from "./role.entity";

export interface User {
  id: number;

  name: string;

  user_id: string;

  email: string;

  password?: string;

  phone: string;

  nickname: string;

  brand: string;

  addr: string;

  company_name: string;

  addr_sub: string;

  zonecode: string;

  provider: string;

  provider_id: string;

  profile: Profile;

  roles?: Role[];

  account_type: string;

  business_type: string;

  business_reg_num: string;

  manager_type: string;

  contact_name: string;

  company_phone: string;

  approved_at?: Date;

  point?: number;

  status: string;

  allow_sms_recv: boolean;

  allow_email_recv: boolean;

  inactive_reason: string;

  inactive_reason_desc: string;

  inactive_at?: Date;

  inactive_by_admin: boolean;

  last_login_at?: Date;

  like_count: number;
  
  liked: boolean;

  idle_at?: Date;

  created_at?: Date;

  updated_at?: Date;
}
