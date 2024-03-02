export interface MainConstructionCase {
  id: number;

  title: string;

  url: string;

  thumb_url: string;

  enabled: boolean;

  seq: number;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
