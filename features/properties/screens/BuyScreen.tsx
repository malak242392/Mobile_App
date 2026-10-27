import { FlatList, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { usePropertyList } from '../usePropertyList';
import { PropertyCard } from '../components/PropertyCard';
import { FilterChips } from '../components/FilterChips';

const ROOMS = [
  { label: 'Any', value: 'any' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3+', value: '3' },
];

export default function BuyScreen() {
  const { list, query, setQuery, rooms, setRooms, favouriteIds, toggleFavourite } = usePropertyList('buy');

  return (
    <View className="flex-1 bg-bg p-3">
      <TextInput
        placeholder="Search properties for sale..."
        value={query}
        onChangeText={setQuery}
        className="mb-3 rounded-xl border border-border bg-card px-4 py-3"
      />

      <Text className="mb-2 font-semibold text-text">Bedrooms</Text>
      <FilterChips options={ROOMS} selected={rooms} onSelect={setRooms} />

      <Text className="mb-2 text-muted">
        {list.length} {list.length === 1 ? 'property' : 'properties'} for sale
      </Text>

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
        ListEmptyComponent={<Text className="mt-10 text-center text-muted">No properties for sale match your search.</Text>}
      />
    </View>
  );
}