export interface Voucher {
  id?: number;
  code: string;
  planId: string;
  planName: string;
  duration: string;
  active: boolean;
}

export interface VoucherValidationResponse {
  success: boolean;
  message?: string;
  planName?: string;
}
