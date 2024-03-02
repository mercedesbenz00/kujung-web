export interface SearchTerm {
  id: number;

  name: string;

  priority: number;

  display: boolean;

  main_display: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
