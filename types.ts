export interface Room {
  id: string;
  name: string;
  type?: string; // e.g. "Deluxe", "Standard"
  description?: string;
  capacity: number; // mapped from maxGuests
  price: number;
  size: number; // in sqm
  floor?: number;
  outdoor?: string;
  features?: string[];
  amenities: string[];
  mainImage: string;
  gallery: string[];
}

export type FilterType = 'all' | 2 | 3 | 4;