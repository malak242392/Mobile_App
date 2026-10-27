import { useRef, useState, type ComponentRef } from 'react';
import { TextInput } from 'react-native';
import { useProfilesStore } from './store';

export function useUserProfileForm() {
  const currentUser = useProfilesStore((s) => s.currentUser);
  const updateUser = useProfilesStore((s) => s.updateUser);

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

    const nameRef = useRef<ComponentRef<typeof TextInput>>(null);
    const phoneRef = useRef<ComponentRef<typeof TextInput>>(null);
    const emailRef = useRef<ComponentRef<typeof TextInput>>(null);

  const hasChanges = name !== currentUser.name || phone !== currentUser.phone || email !== currentUser.email;

  function changeName(text: string) {
    setName(text);
    setSaved(false);
  }

  function changePhone(text: string) {
    setPhone(text);
    setSaved(false);
  }

  function changeEmail(text: string) {
    setEmail(text);
    setSaved(false);
  }

  function save() {
    if (!name.trim()) {
      setError('Name is required');
      nameRef.current?.focus();
      return;
    }
    if (phone.length !== 11) {
      setError('Phone number must be 11 digits');
      phoneRef.current?.focus();
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      emailRef.current?.focus();
      return;
    }

    setError('');
    updateUser({ name: name.trim(), phone, email });
    setSaved(true);
  }

  return {
    currentUser,
    name,
    phone,
    email,
    changeName,
    changePhone,
    changeEmail,
    nameRef,
    phoneRef,
    emailRef,
    error,
    saved,
    hasChanges,
    save,
  };
}