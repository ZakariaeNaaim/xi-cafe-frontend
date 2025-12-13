export enum DurationType {
  Fixed = 'fixed', // e.g. 24 hours
  Voyage = 'voyage', // whole cruise
  Data = 'data', // e.g. 2 GB, 10 GB (future)
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  basePrice: number;
}

export interface Duration {
  id: number;
  name: string;
  type: DurationType;
  value: number | null;
  unit: string | null;
  multiplier: number;
}

export interface Upgrade {
  name: string;
  description: string;
}
