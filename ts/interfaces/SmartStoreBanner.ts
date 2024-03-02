export interface SmartStoreBanner {
  id: number;

  title: string;

  address: string;

  thumb_url: string;

  thumb_url_mobile: string;

  image_url: string;

  image_url_mobile: string;

  enabled: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
