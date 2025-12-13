// Purchase Models
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
