import { useMemo, useState } from 'react';
import { usePropertiesStore } from '@/features/properties/store';
import { useProfilesStore } from '@/features/profiles/store';
import { USERS } from '@/features/profiles/data';
import { INQUIRIES } from './data';

export function useMyListings() {
  // one selector per value / action, like the cart screen
  const properties = usePropertiesStore((s) => s.properties);
  const removeProperty = usePropertiesStore((s) => s.removeProperty);
  const advertiser = useProfilesStore((s) => s.currentAdvertiser);

  const [query, setQuery] = useState('');

  const mine = useMemo(
    () => properties.filter((p) => p.advertiserId === advertiser.id),
    [properties, advertiser.id],
  );

  const listings = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === '') return mine;
    return mine.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.compound.toLowerCase().includes(q),
    );
  }, [mine, query]);

  const interested = useMemo(() => {
    const result = [];
    for (const inquiry of INQUIRIES) {
      const property = mine.find((p) => p.id === inquiry.propertyId);
      const user = USERS.find((u) => u.id === inquiry.userId);
      if (property && user) result.push({ id: inquiry.id, user, property });
    }
    return result;
  }, [mine]);

  return { advertiser, listings, total: mine.length, query, setQuery, remove: removeProperty, interested };
}