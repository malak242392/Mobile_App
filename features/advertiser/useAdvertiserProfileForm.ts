import { RefObject, useMemo, useRef, useState } from 'react';
import { useProfilesStore } from '@/features/profiles/store';
import { usePropertiesStore } from '@/features/properties/store';
import { REVIEWS } from '@/features/profiles/data';
import type { InputRef } from './components/FormField';


type FieldName = 'name' | 'company' | 'phone' | 'email';
type FormError = { field: FieldName; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^01[0-9]{9}$/; 

export function useAdvertiserProfileForm() {
  const advertiser = useProfilesStore((s) => s.currentAdvertiser);
  const updateAdvertiser = useProfilesStore((s) => s.updateAdvertiser);
  const properties = usePropertiesStore((s) => s.properties);

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<FormError | null>(null);

  const [name, setName] = useState(advertiser.name);
  const [company, setCompany] = useState(advertiser.company);
  const [phone, setPhone] = useState(advertiser.phone);
  const [email, setEmail] = useState(advertiser.email);

  const refs: Record<FieldName, RefObject<InputRef | null>> = {
    name: useRef<InputRef>(null),
    company: useRef<InputRef>(null),
    phone: useRef<InputRef>(null),
    email: useRef<InputRef>(null),
  };

  const listingsCount = useMemo(
    () => properties.filter((p) => p.advertiserId === advertiser.id).length,
    [properties, advertiser.id],
  );
  const reviews = useMemo(() => REVIEWS.filter((r) => r.targetId === advertiser.id), [advertiser.id]);
  const average = useMemo(
    () => (reviews.length === 0 ? 0 : reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length),
    [reviews],
  );

  function startEditing() {
    setSaved(false);
    setEditing(true);
  }

  function cancel() {
    setName(advertiser.name);
    setCompany(advertiser.company);
    setPhone(advertiser.phone);
    setEmail(advertiser.email);
    setError(null);
    setEditing(false);
  }

  function validate(): FormError | null {
    if (name.trim() === '') return { field: 'name', message: 'Please enter your name' };
    if (company.trim() === '') return { field: 'company', message: 'Please enter your company' };
    if (!PHONE_PATTERN.test(phone.trim())) {
      return { field: 'phone', message: 'Enter a valid phone number (e.g. 01012345678)' };
    }
    if (!EMAIL_PATTERN.test(email.trim())) return { field: 'email', message: 'Please enter a valid email' };
    return null;
  }

  function save() {
    const problem = validate();
    if (problem) {
      setError(problem);
      refs[problem.field].current?.focus();
      return;
    }

    updateAdvertiser({ name: name.trim(), company: company.trim(), phone: phone.trim(), email: email.trim() });
    setError(null);
    setEditing(false);
    setSaved(true);
  }

  return {
    advertiser,
    editing,
    saved,
    error,
    refs,
    fields: { name, company, phone, email },
    setName,
    setCompany,
    setPhone,
    setEmail,
    listingsCount,
    reviews,
    average,
    startEditing,
    cancel,
    save,
  };
}