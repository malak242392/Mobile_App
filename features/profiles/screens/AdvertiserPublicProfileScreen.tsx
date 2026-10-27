import { ScrollView, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { usePublicProfile } from '../usePublicProfile';
import { Avatar } from '../components/Avatar';
import { RatingStars } from '../components/RatingStars';
import { ReviewItem } from '../components/ReviewItem';
import { PropertyCard } from '@/features/properties/components/PropertyCard';

export default function AdvertiserPublicProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { advertiser, reviews, average, listings } = usePublicProfile(id);

  if (!advertiser) return <Text className="p-5 text-danger">Advertiser not found</Text>;

  return (
    <ScrollView className="bg-bg" contentContainerClassName="gap-3 p-4">
      <Stack.Screen options={{ title: advertiser.name }} />

      <View className="items-center gap-2 rounded-xl border border-border bg-card p-4">
        <Avatar name={advertiser.name} size="lg" />
        <Text className="text-xl font-bold text-text">{advertiser.name}</Text>
        <Text className="font-semibold text-text">{advertiser.company}</Text>
        <Text className="text-muted">Member since {advertiser.memberSince}</Text>
        <View className="flex-row items-center gap-2">
          <RatingStars rating={average} />
          <Text className="text-muted">
            {average.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </Text>
        </View>
      </View>

      <View className="gap-1 rounded-xl border border-border bg-card p-4">
        <Text className="font-bold text-text">Contact</Text>
        <Text className="text-muted">Phone: {advertiser.phone}</Text>
        <Text className="text-muted">Email: {advertiser.email}</Text>
      </View>

      <Text className="text-lg font-bold text-primary">
        Listings ({listings.length})
      </Text>
      {listings.length === 0 && <Text className="text-muted">No listings right now.</Text>}
      {listings.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}

      <Text className="text-lg font-bold text-primary">Reviews</Text>
      {reviews.length === 0 && <Text className="text-muted">No reviews yet.</Text>}
      {reviews.map((r) => (
        <ReviewItem key={r.id} review={r} />
      ))}
    </ScrollView>
  );
}