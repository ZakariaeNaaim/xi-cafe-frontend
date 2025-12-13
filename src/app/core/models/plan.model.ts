export interface Plan {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

export interface Duration {
  id: string;
  name: string;
  multiplier: number;
}

export interface Upgrade {
  name: string;
  description: string;
}
