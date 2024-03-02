export interface Faq {
  id: number;

  question: string;

  answer: string;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
