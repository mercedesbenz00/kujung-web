export interface Wish {
  id: number;

  type: string;

  user_id: number;

  entity_id: number;

  created_at?: Date;

  updated_at?: Date;
}
