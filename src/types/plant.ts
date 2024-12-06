export interface Plant {
    id: string;
    name: string;
    species?: string;
    last_watered: string; // ISO date string
    watering_interval: number;
    user_id: string;
    created_at: string;
  }