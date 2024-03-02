export interface PointProduct {
  id: number;

  name: string;

  summary: string;

  point?: number;

  desc: string;

  thumb_url: string;

  is_bee: boolean;

  seq: number;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
