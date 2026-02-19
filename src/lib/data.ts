export interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: "Petrol" | "Diesel" | "EV" | "Hybrid";
  transmission: "Manual" | "Automatic";
  bodyType: "SUV" | "Sedan" | "Hatchback";
  images: string[];
  description: string;
}
