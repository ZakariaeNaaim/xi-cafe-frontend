import { Plan, Duration } from './plan.model';

export interface Voucher {
  id: number;
  code: string;
  planId: number;
  planName: string;
  durationId: number;
  active: boolean;
}

export interface VoucherValidationResponse {
  success: boolean;
  message?: string;
  plan?: Plan;
  duration?: Duration;
}
