import { SmartcareService } from "./SmartcareService";

export interface SmartcareServiceMemo {
  id: number;

  content: string;

  smartcareService: SmartcareService;

  status?: number;

  created_at?: Date;

  updated_at?: Date;
}
