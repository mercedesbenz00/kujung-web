export interface SmartStore {
  id: number;

  name: string;

  address: string;

  thumb_url: string;

  display: boolean;

  wish_count: number;
  
  desc: string;

  recommended: boolean;

  category: string;

  wished: boolean;
  
  like_count: number;

  liked: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
