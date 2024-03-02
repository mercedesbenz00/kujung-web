import { Category } from './Category';

export interface CategoryYoutube {
  id: number; // title, summary, url

  title: string;

  summary: string;

  url: string;

  thumb_url: string;

  category: Category;
}
