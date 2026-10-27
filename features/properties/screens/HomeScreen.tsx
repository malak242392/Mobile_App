import { FlatList, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { usePropertyList } from '../usePropertyList';
import { PropertyCard } from '../components/PropertyCard';
import { FilterChips } from '../components/FilterChips';
import { Button } from '@/shared/components/Button';

const TYPES = [
  { label: 'All', value: 'all' },
  { label: 'Rent', value: 'rent' },
  { label: 'Sale', value: 'buy' },
];

export default function HomeScreen() {
  const { list, query, setQuery, listingType, setListingType, favouriteIds, toggleFavourite } = usePropertyList();

  return (
    <View className="flex-1 bg-bg p-3">
      <TextInput
        placeholder="Search by title or area..."
        value={query}
        onChangeText={setQuery}
        className="mb-3 rounded-xl border border-border bg-card px-4 py-3"
      />

      <FilterChips options={TYPES} selected={listingType} onSelect={setListingType} />

      <View className="mb-3 flex-row gap-2">
        <View className="flex-1">
          <Button title="For Rent" onPress={() => router.push('/rent')} />
        </View>
        <View className="flex-1">
          <Button title="For Sale" onPress={() => router.push('/buy')} />
        </View>
      </View>

      <FlatList
        data={list}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            favourite={favouriteIds.includes(item.id)}
            onToggle={() => toggleFavourite(item.id)}
            onPress={() => router.push(`/advertiser-profile/${item.advertiserId}`)}
          />
        )}
        ListEmptyComponent={<Text className="mt-10 text-center text-muted">No properties found.</Text>}
      />
    </View>
  );
}