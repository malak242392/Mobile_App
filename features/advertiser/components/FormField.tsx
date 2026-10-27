import { ComponentRef, RefObject } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@/shared/theme';

// Instance type of a TextInput (has focus(), blur(), ...). Newer React Native types
// don't let us use `TextInput` itself as the instance type.
export type InputRef = ComponentRef<typeof TextInput>;

// Label + input used by the Post Property and Advertiser Profile forms.
// Red border when the field has the error; grey when it is not editable.
type Props = TextInputProps & {
  label: string;
  hasError?: boolean;
  inputRef?: RefObject<InputRef | null>;
};

export function FormField({ label, hasError = false, inputRef, editable = true, ...inputProps }: Props) {
  return (
    <View className="gap-1">
      <Text className="text-sm font-semibold text-text">{label}</Text>
      <TextInput
        ref={inputRef}
        editable={editable}
        placeholderTextColor={colors.muted}
        accessibilityLabel={label}
        className={`rounded-xl border p-3 text-base ${hasError ? 'border-danger' : 'border-border'} ${editable ? 'bg-card text-text' : 'bg-bg text-muted'}`}
        {...inputProps}
      />
    </View>
  );
}