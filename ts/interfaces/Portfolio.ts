import { PortfolioImage } from "./PortfolioImage";

export interface Portfolio {
  id: number;

  title: string;

  summary: string;

  content: string;

  category: string;

  collaboration: string;

  place: string;

  online_info: string;

  portfolioImages: PortfolioImage[];

  start_at?: Date;

  end_at?: Date;

  like_count: number;
  
  view_count: number;

  liked: boolean;

  created_at?: Date;

  updated_at?: Date;
}
