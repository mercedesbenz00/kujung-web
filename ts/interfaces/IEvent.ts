export interface IEvent {
  id: number;

  title: string;

  content: string;

  start_at?: Date;

  end_at?: Date;

  thumb_url: string;

  enabled: boolean;

  created_by: number;

  updated_by: number;

  created_at?: Date;

  updated_at?: Date;
}
