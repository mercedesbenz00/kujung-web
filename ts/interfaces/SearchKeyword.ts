import { SearchKeywordTypo } from "./SearchKeywordTypo";

export interface SearchKeyword {
  id: number;

  name: string;

  searchKeywordTypos: SearchKeywordTypo[];

  created_at?: Date;

  updated_at?: Date;
}
