import { Alert, FlatList, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button } from '@/shared/components/Button';
import { colors } from '@/shared/theme';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { Property } from '@/features/properties/types';
import { Avatar } from '@/features/profiles/components/Avatar';
import { useMyListings } from '../useMyListings';

function confirmRemove(property: Property, onConfirm: () => void) {
  const message = `Remove "${property.title}" from your listings?`;
  if (Platform.OS === 'web') {
    if (window.confirm(message)) onConfirm();
    return;
  }
  Alert.alert('Remove listing', message, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Remove', style: 'destructive', onPress: onConfirm },
  ]);
}

export default function AdvertiserHomeScreen() {
  const { advertiser, listings, total, query, setQuery, remove, interested } = useMyListings();

  return (
    <View className="flex-1 bg-bg p-3">
      <Text className="text-muted">Hello, {advertiser.name.split(' ')[0]}</Text>
      <Text className="mb-3 text-2xl font-bold text-primary">My Listings</Text>

      <View className="mb-3 flex-row items-center gap-2 rounded-xl border border-border bg-card px-3">
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search my properties"
          placeholderTextColor={colors.muted}
          accessibilityLabel="Search my properties"
          className="flex-1 py-3 text-base text-text"
        />
      </View>

      <View className="mb-3">
        <Button title="Post a property" onPress={() => router.push('/advertiser/post')} />
      </View>

      <FlatList
        data={listings}
        keyExtractor={(p) => p.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <View>
            <PropertyCard property={item} />
            <Pressable
              onPress={() => confirmRemove(item, () => remove(item.id))}
              className="-mt-1 mb-3 flex-row items-center gap-1 self-end active:opacity-70"
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.title}`}
            >
              <Ionicons name="trash-outline" size={16} color={colors.danger} />
              <Text className="text-[13px] font-semibold text-danger">Remove</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text className="mt-6 text-center text-muted">
            {total === 0 ? 'You have no listings yet.' : `No results for "${query}".`}
          </Text>
        }
        ListFooterComponent={
          <View className="mt-2 border-t border-border pb-6 pt-3">
            <Text className="mb-2 text-lg font-bold text-primary">Interested users</Text>

            {interested.length === 0 ? (
              <Text className="text-muted">No one has asked about your properties yet.</Text>
            ) : (
              interested.map(({ id, user, property }) => (
                <Pressable
                  key={id}
                  onPress={() => router.push(`/user-profile/${user.id}`)}
                  className="mb-2 flex-row items-center gap-3 rounded-xl border border-border bg-card p-3 active:opacity-70"
                  accessibilityRole="button"
                  accessibilityLabel={`${user.name} asked about ${property.title}`}
                >
                  <Avatar name={user.name} />
                  <View className="flex-1">
                    <Text className="font-bold text-text">{user.name}</Text>
                    <Text className="text-[13px] text-muted" numberOfLines={1}>
                      Asked about: {property.title}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                </Pressable>
              ))
            )}
          </View>
        }
      />
    </View>
  );
}