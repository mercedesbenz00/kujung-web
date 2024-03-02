export interface Notification {
  id: number;

  title: string;

  content: string;

  top_fixed: boolean;

  like_count: number;

  view_count: number;

  thumb_url: string;

  thumb_url_mobile: string;

  liked: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
