export interface Catalog {
  id: number;

  title: string;

  summary: string;

  category: string;

  download_file: string;

  preview_file: string;

  thumb_url: string;

  thumb_url_mobile: string;

  created_at?: Date;

  updated_at?: Date;
}
