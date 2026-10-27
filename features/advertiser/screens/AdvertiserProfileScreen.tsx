import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '@/shared/components/Button';
import { Avatar } from '@/features/profiles/components/Avatar';
import { RatingStars } from '@/features/profiles/components/RatingStars';
import { ReviewItem } from '@/features/profiles/components/ReviewItem';
import { FormField } from '../components/FormField';
import { useAdvertiserProfileForm } from '../useAdvertiserProfileForm';


export default function AdvertiserProfileScreen() {
  const {
    advertiser, editing, saved, error, refs, fields,
    setName, setCompany, setPhone, setEmail,
    listingsCount, reviews, average,
    startEditing, cancel, save,
  } = useAdvertiserProfileForm();

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="gap-3 p-4"
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center gap-1">
        <Avatar name={advertiser.name} size="lg" />
        <Text className="mt-2 text-2xl font-bold text-primary">{advertiser.name}</Text>
        <Text className="text-muted">{advertiser.company}</Text>
        <View className="mt-1 flex-row items-center gap-2">
          <RatingStars rating={average} />
          <Text className="text-text">
            {average.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </Text>
        </View>
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1 items-center rounded-xl bg-secondary p-3">
          <Text className="text-lg font-bold text-primary">{listingsCount}</Text>
          <Text className="text-xs text-text">Listings</Text>
        </View>
        <View className="flex-1 items-center rounded-xl bg-secondary p-3">
          <Text className="text-lg font-bold text-primary">{reviews.length}</Text>
          <Text className="text-xs text-text">Reviews</Text>
        </View>
        <View className="flex-1 items-center rounded-xl bg-secondary p-3">
          <Text className="text-lg font-bold text-primary">{advertiser.memberSince}</Text>
          <Text className="text-xs text-text">Member since</Text>
        </View>
      </View>

      <Text className="mt-2 text-lg font-bold text-primary">Account details</Text>

      <FormField
        label="Full name"
        value={fields.name}
        onChangeText={setName}
        inputRef={refs.name}
        editable={editing}
        hasError={error?.field === 'name'}
      />
      <FormField
        label="Company"
        value={fields.company}
        onChangeText={setCompany}
        inputRef={refs.company}
        editable={editing}
        hasError={error?.field === 'company'}
      />
      <FormField
        label="Phone"
        value={fields.phone}
        onChangeText={setPhone}
        inputRef={refs.phone}
        editable={editing}
        hasError={error?.field === 'phone'}
        keyboardType="phone-pad"
        maxLength={11}
      />
      <FormField
        label="Email"
        value={fields.email}
        onChangeText={setEmail}
        inputRef={refs.email}
        editable={editing}
        hasError={error?.field === 'email'}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {error && <Text className="text-danger">{error.message}</Text>}
      {saved && !editing && <Text className="text-primary">Profile updated.</Text>}

      {editing ? (
        <View className="flex-row gap-3">
          <Pressable
            onPress={cancel}
            className="flex-1 items-center rounded-xl border border-primary px-4 py-3 active:opacity-70"
            accessibilityRole="button"
          >
            <Text className="font-semibold text-primary">Cancel</Text>
          </Pressable>
          <View className="flex-1">
            <Button title="Save" onPress={save} />
          </View>
        </View>
      ) : (
        <Button title="Edit profile" onPress={startEditing} />
      )}

      <Text className="mt-2 text-lg font-bold text-primary">What clients say</Text>
      {reviews.length === 0 ? (
        <Text className="text-muted">No reviews yet.</Text>
      ) : (
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}
    </ScrollView>
  );
}