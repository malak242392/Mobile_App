import { Pressable, Text, View } from 'react-native';

type Props = {
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
};

export function FilterChips({ options, selected, onSelect }: Props) {
  return (
    <View className="mb-3 flex-row gap-2">
      {options.map((o) => (
        <Pressable
          key={o.value}
          onPress={() => onSelect(o.value)}
          className={`rounded-full border px-4 py-2 active:opacity-70 ${selected === o.value ? 'border-primary bg-primary' : 'border-border bg-card'}`}
        >
          <Text className={selected === o.value ? 'font-semibold text-white' : 'text-text'}>{o.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}