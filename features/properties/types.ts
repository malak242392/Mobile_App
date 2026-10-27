export type ListingType = 'rent' | 'buy';

export type Property = {
  id: string;
  type: ListingType;
  title: string;
  emoji: string;
  location: string;
  compound: string; 
  address: string;
  mapsLink: string;
  price: number;
  rooms: number;
  area: number;
  description: string;
  advertiserId: string;
};
