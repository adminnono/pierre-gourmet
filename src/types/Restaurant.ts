export interface Dish {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  chef: string;
  rating: number;
  photos: string[];
  dishes: Dish[];
  totalBill: number;
  visitDate: string;
  notes?: string;
}