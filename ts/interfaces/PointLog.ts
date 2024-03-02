import { User } from "./User";

export interface PointLog {
  id: number;

  user: User;

  point?: number;

  memo: string;

  type: string;

  is_direct: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
