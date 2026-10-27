import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useUserProfileForm } from '../useUserProfileForm';
import { Avatar } from '../components/Avatar';

export default function UserProfileScreen() {
  const form = useUserProfileForm();

  return (
    <ScrollView className="bg-bg" contentContainerClassName="gap-3 p-4">
      <View className="items-center gap-2 rounded-xl border border-border bg-card p-4">
        <Avatar name={form.currentUser.name} size="lg" />
        <Text className="text-xl font-bold text-text">{form.currentUser.name}</Text>
        <Text className="text-muted">Member since {form.currentUser.memberSince}</Text>
      </View>

      <Text className="text-lg font-bold text-primary">Edit my information</Text>

      <Text className="font-semibold text-text">Full name</Text>
      <TextInput
        ref={form.nameRef}
        value={form.name}
        onChangeText={form.changeName}
        placeholder="Full name"
        className="rounded-xl border border-border bg-card px-4 py-3"
      />

      <Text className="font-semibold text-text">Phone</Text>
      <TextInput
        ref={form.phoneRef}
        value={form.phone}
        onChangeText={form.changePhone}
        placeholder="01012345678"
        className="rounded-xl border border-border bg-card px-4 py-3"
      />

      <Text className="font-semibold text-text">Email</Text>
      <TextInput
        ref={form.emailRef}
        value={form.email}
        onChangeText={form.changeEmail}
        placeholder="name@example.com"
        className="rounded-xl border border-border bg-card px-4 py-3"
      />

      {form.error !== '' && <Text className="text-danger">{form.error}</Text>}

      <Pressable
        onPress={form.save}
        disabled={!form.hasChanges}
        className={`items-center rounded-xl px-4 py-3 active:opacity-70 ${form.hasChanges ? 'bg-primary' : 'bg-primary opacity-40'}`}
      >
        <Text className="font-semibold text-white">Save changes</Text>
      </Pressable>

      {form.saved && <Text className="text-center font-semibold text-primary">Saved ✓</Text>}
    </ScrollView>
  );
}