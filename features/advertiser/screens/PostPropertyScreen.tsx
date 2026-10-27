import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/shared/components/Button';
import { FormField } from '../components/FormField';
import { MIN_DESCRIPTION, usePostPropertyForm } from '../usePostPropertyForm';

// Post Property. Form + validation like Lab 2, Task 11.5:
// controlled inputs, red error message, and the invalid field gets focus.
export default function PostPropertyScreen() {
  const { values, setField, error, refs, save } = usePostPropertyForm();

  function handlePost() {
    // on success the property is in the store, so go back to see it in My Listings
    if (save()) router.push('/advertiser');
  }

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="gap-3 p-4"
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-2xl font-bold text-primary">Post a Property</Text>
      <Text className="-mt-2 text-muted">Fill in the property details. * is required.</Text>

      <Text className="text-sm font-semibold text-text">Listing type</Text>
      <View className="flex-row gap-3">
        <Pressable
          onPress={() => setField('type', 'rent')}
          className={`flex-1 items-center rounded-xl border p-3 active:opacity-70 ${values.type === 'rent' ? 'border-primary bg-primary' : 'border-border bg-card'}`}
          accessibilityRole="button"
          accessibilityState={{ selected: values.type === 'rent' }}
        >
          <Text className={values.type === 'rent' ? 'font-semibold text-white' : 'text-text'}>For Rent</Text>
        </Pressable>
        <Pressable
          onPress={() => setField('type', 'buy')}
          className={`flex-1 items-center rounded-xl border p-3 active:opacity-70 ${values.type === 'buy' ? 'border-primary bg-primary' : 'border-border bg-card'}`}
          accessibilityRole="button"
          accessibilityState={{ selected: values.type === 'buy' }}
        >
          <Text className={values.type === 'buy' ? 'font-semibold text-white' : 'text-text'}>For Sale</Text>
        </Pressable>
      </View>

      <FormField
        label="Title *"
        value={values.title}
        onChangeText={(t) => setField('title', t)}
        inputRef={refs.title}
        hasError={error?.field === 'title'}
        placeholder="e.g. 2-bedroom apartment"
      />

      <FormField
        label="Location *"
        value={values.location}
        onChangeText={(t) => setField('location', t)}
        inputRef={refs.location}
        hasError={error?.field === 'location'}
        placeholder="e.g. New Cairo"
      />

      <FormField
        label="Compound name (optional)"
        value={values.compound}
        onChangeText={(t) => setField('compound', t)}
        placeholder="e.g. Madinaty"
      />

      <FormField
        label="Detailed address *"
        value={values.address}
        onChangeText={(t) => setField('address', t)}
        inputRef={refs.address}
        hasError={error?.field === 'address'}
        placeholder="Building, street, floor"
      />

      <FormField
        label="Google Maps link *"
        value={values.mapsLink}
        onChangeText={(t) => setField('mapsLink', t)}
        inputRef={refs.mapsLink}
        hasError={error?.field === 'mapsLink'}
        placeholder="https://maps.app.goo.gl/..."
        autoCapitalize="none"
        keyboardType="url"
      />

      <FormField
        label={values.type === 'rent' ? 'Monthly rent (EGP) *' : 'Price (EGP) *'}
        value={values.price}
        onChangeText={(t) => setField('price', t)}
        inputRef={refs.price}
        hasError={error?.field === 'price'}
        placeholder="e.g. 15000"
        keyboardType="numeric"
      />

      <View className="flex-row gap-3">
        <View className="flex-1">
          <FormField
            label="Rooms *"
            value={values.rooms}
            onChangeText={(t) => setField('rooms', t)}
            inputRef={refs.rooms}
            hasError={error?.field === 'rooms'}
            placeholder="e.g. 3"
            keyboardType="numeric"
          />
        </View>
        <View className="flex-1">
          <FormField
            label="Area (m²) *"
            value={values.area}
            onChangeText={(t) => setField('area', t)}
            inputRef={refs.area}
            hasError={error?.field === 'area'}
            placeholder="e.g. 120"
            keyboardType="numeric"
          />
        </View>
      </View>

      <FormField
        label="Description *"
        value={values.description}
        onChangeText={(t) => setField('description', t)}
        inputRef={refs.description}
        hasError={error?.field === 'description'}
        placeholder="Bathrooms, finishing, view..."
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        className="h-28"
      />
      <Text className="-mt-2 text-[13px] text-muted">
        {values.description.trim().length} / {MIN_DESCRIPTION} characters minimum
      </Text>

      {error && <Text className="text-danger">{error.message}</Text>}

      <View className="mb-6 mt-1">
        <Button title="Post property" onPress={handlePost} />
      </View>
    </ScrollView>
  );
}