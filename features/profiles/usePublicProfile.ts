import { useMemo } from 'react';
import { ADVERTISERS, REVIEWS, USERS } from './data';
import { usePropertiesStore } from '@/features/properties/store';

export function usePublicProfile(id: string) {
  const properties = usePropertiesStore((s) => s.properties);

  const user = useMemo(() => USERS.find((item) => item.id === id), [id]);
  const advertiser = useMemo(() => ADVERTISERS.find((item) => item.id === id), [id]);

  const reviews = useMemo(() => REVIEWS.filter((r) => r.targetId === id), [id]);

  const average = useMemo(
    () => (reviews.length === 0 ? 0 : reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length),
    [reviews],
  );

  const listings = useMemo(() => properties.filter((p) => p.advertiserId === id), [properties, id]);

  return { user, advertiser, reviews, average, listings };
}