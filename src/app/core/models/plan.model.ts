export enum DurationType {
  Fixed = 'fixed',
  Voyage = 'voyage',
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
