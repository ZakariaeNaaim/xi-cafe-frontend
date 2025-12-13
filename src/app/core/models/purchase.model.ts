import { Plan, Duration } from './plan.model';

export interface PurchaseRequest {
  planName: string;
  duration: string;
  devices: number;
  price: number;
}

export interface PurchaseResponse {
  success: boolean;
  message?: string;
  orderId?: string;
}

export interface PurchaseState {
  plan: Plan | null;
  duration: Duration | null;
  devices: number;
}
