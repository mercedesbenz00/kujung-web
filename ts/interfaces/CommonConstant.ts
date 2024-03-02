import { Category } from './Category';

export interface CommonConstant {
  id: number;
  
  name: string;

  type: string;

  value_num: number;

  priority: number;

  display: boolean;

  main_display: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;

  selected: boolean; // front에서 사용하기 위해 추가.
}
