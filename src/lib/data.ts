export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: "Petrol" | "Diesel" | "EV" | "Hybrid";
  transmission: "Manual" | "Automatic";
  bodyType: "SUV" | "Sedan" | "Hatchback";
  image: string;
  description: string;
}

export const CARS: Car[] = [
  {
    id: "1",
    make: "BMW",
    model: "X5 M50i",
    year: 2022,
    price: 65000,
    mileage: 12000,
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1556189250-72ba954e9664?auto=format&fit=crop&w=800&q=80",
    description:
      "Stunning BMW X5 in Carbon Black. Fully loaded with M Sport Pro pack.",
  },
  {
    id: "2",
    make: "Mercedes",
    model: "C63 AMG",
    year: 2020,
    price: 45000,
    mileage: 24000,
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    description: "V8 Bi-Turbo monster. Last of the V8s. Immaculate condition.",
  },
  {
    id: "3",
    make: "Tesla",
    model: "Model 3 Performance",
    year: 2023,
    price: 42000,
    mileage: 5000,
    fuel: "EV",
    transmission: "Automatic",
    bodyType: "Sedan",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    description:
      "Rapid acceleration, zero emissions. White interior, premium wheels.",
  },
  {
    id: "4",
    make: "Audi",
    model: "RS3",
    year: 2021,
    price: 52000,
    mileage: 15000,
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "Hatchback",
    image:
      "https://images.unsplash.com/photo-1603584173870-7b299f589389?auto=format&fit=crop&w=800&q=80",
    description: "The pocket rocket. 5 Cylinder symphon. Nardo Grey.",
  },
  {
    id: "5",
    make: "Land Rover",
    model: "Defender 90",
    year: 2023,
    price: 58000,
    mileage: 8000,
    fuel: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    description: "Go anywhere, do anything. Commercial pricing available.",
  },
];
