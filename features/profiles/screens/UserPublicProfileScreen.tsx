import { ScrollView, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { usePublicProfile } from '../usePublicProfile';
import { Avatar } from '../components/Avatar';
import { RatingStars } from '../components/RatingStars';
import { ReviewItem } from '../components/ReviewItem';

export default function UserPublicProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user, reviews, average } = usePublicProfile(id);

  if (!user) return <Text className="p-5 text-danger">User not found</Text>;

  return (
    <ScrollView className="bg-bg" contentContainerClassName="gap-3 p-4">
      <Stack.Screen options={{ title: user.name }} />

      <View className="items-center gap-2 rounded-xl border border-border bg-card p-4">
        <Avatar name={user.name} size="lg" />
        <Text className="text-xl font-bold text-text">{user.name}</Text>
        <Text className="text-muted">Member since {user.memberSince}</Text>
        <View className="flex-row items-center gap-2">
          <RatingStars rating={average} />
          <Text className="text-muted">
            {average.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </Text>
        </View>
      </View>

      <View className="gap-1 rounded-xl border border-border bg-card p-4">
        <Text className="font-bold text-text">Contact</Text>
        <Text className="text-muted">Phone: {user.phone}</Text>
        <Text className="text-muted">Email: {user.email}</Text>
      </View>

      <Text className="text-lg font-bold text-primary">Reviews from advertisers</Text>
      {reviews.length === 0 && <Text className="text-muted">No reviews yet.</Text>}
      {reviews.map((r) => (
        <ReviewItem key={r.id} review={r} />
      ))}
    </ScrollView>
  );
}