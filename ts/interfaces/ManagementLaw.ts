export interface ManagementLaw {
  id: number;

  title: string;

  summary: string;

  video_url: string;

  thumb_url: string;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
