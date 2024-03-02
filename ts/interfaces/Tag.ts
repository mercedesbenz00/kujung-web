export interface Tag {
  id: number;

  name: string;

  priority: number;

  display: boolean;

  main_display: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;

  selected: boolean; // 프론트에서 사용하기 위해 추가.
}
