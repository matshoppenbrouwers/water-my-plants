export interface Plant {
  id: string;
  name: string;
  species?: string;
  lastWatered: Date;
  wateringInterval: number; // in days
} 