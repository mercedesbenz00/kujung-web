export interface BannerSetting {
  id: number;

  interval: number;

  banner_type: string;

  auto_transition: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
