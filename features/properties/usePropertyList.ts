import { useMemo, useState } from 'react';
import { usePropertiesStore } from './store';
import { ListingType } from './types';
import { useFavouritesStore } from '@/features/favourites/store';

export function usePropertyList(type?: ListingType) {
  const properties = usePropertiesStore((s) => s.properties);
  const favouriteIds = useFavouritesStore((s) => s.ids);
  const toggleFavourite = useFavouritesStore((s) => s.toggle);

  const [query, setQuery] = useState('');
  const [listingType, setListingType] = useState<string>(type ?? 'all');
  const [rooms, setRooms] = useState('any');

  const list = useMemo(
    () =>
      properties.filter(
        (p) =>
          (listingType === 'all' || p.type === listingType) &&
          (rooms === 'any' || (rooms === '3' ? p.rooms >= 3 : p.rooms === Number(rooms))) &&
          (p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.location.toLowerCase().includes(query.toLowerCase())),
      ),
    [properties, listingType, rooms, query],
  );

  return { list, query, setQuery, listingType, setListingType, rooms, setRooms, favouriteIds, toggleFavourite };
}