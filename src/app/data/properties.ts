export type Property = {
  id: string;
  title: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
};

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    price: '$1,200,000',
    address: '123 Main St, Metropolis',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    image: 'property-1',
  },
  {
    id: '2',
    title: 'Charming Suburban Home',
    price: '$850,000',
    address: '456 Oak Ave, Suburbia',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    image: 'property-2',
  },
  {
    id: '3',
    title: 'Luxury Penthouse Suite',
    price: '$3,500,000',
    address: '789 Sky High Blvd, Metropolis',
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3200,
    image: 'property-3',
  },
  {
    id: '4',
    title: 'Cozy Family Bungalow',
    price: '$675,000',
    address: '101 Pine Ln, Greenfield',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    image: 'property-4',
  },
];
