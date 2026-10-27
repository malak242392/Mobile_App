import { RefObject, useRef, useState } from 'react';
import { usePropertiesStore } from '@/features/properties/store';
import { useProfilesStore } from '@/features/profiles/store';
import { ListingType } from '@/features/properties/types';
import type { InputRef } from './components/FormField';

// VIEWMODEL for Post Property (Member 2). Pattern: Lab 2, Task 11.5
// (controlled inputs, validation, red error + useRef focus, new object, clear after save).
export type FieldName = 'title' | 'location' | 'address' | 'mapsLink' | 'price' | 'rooms' | 'area' | 'description';
type FormError = { field: FieldName; message: string };

type FormValues = {
  type: ListingType;
  title: string;
  location: string;
  compound: string; // optional
  address: string;
  mapsLink: string;
  price: string; // kept as text while typing, converted in save()
  rooms: string;
  area: string;
  description: string;
};

const EMPTY: FormValues = {
  type: 'rent',
  title: '',
  location: '',
  compound: '',
  address: '',
  mapsLink: '',
  price: '',
  rooms: '',
  area: '',
  description: '',
};

export const MIN_DESCRIPTION = 20;
const MAPS_PREFIXES = ['https://maps.google', 'https://www.google.com/maps', 'https://maps.app.goo.gl', 'https://goo.gl/maps'];

export function usePostPropertyForm() {
  const addProperty = usePropertiesStore((s) => s.addProperty);
  const advertiser = useProfilesStore((s) => s.currentAdvertiser);

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [error, setError] = useState<FormError | null>(null);

  // one ref per required field, so we can focus the one that needs fixing
  const refs: Record<FieldName, RefObject<InputRef | null>> = {
    title: useRef<InputRef>(null),
    location: useRef<InputRef>(null),
    address: useRef<InputRef>(null),
    mapsLink: useRef<InputRef>(null),
    price: useRef<InputRef>(null),
    rooms: useRef<InputRef>(null),
    area: useRef<InputRef>(null),
    description: useRef<InputRef>(null),
  };

  // new object every time, never mutate the old state
  function setField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (error && error.field === field) setError(null);
  }

  // returns the first problem (in screen order) or null
  function validate(): FormError | null {
    if (values.title.trim() === '') return { field: 'title', message: 'Please enter a title' };
    if (values.location.trim() === '') return { field: 'location', message: 'Please enter the location' };
    if (values.address.trim() === '') return { field: 'address', message: 'Please enter the detailed address' };

    const link = values.mapsLink.trim();
    if (link === '') return { field: 'mapsLink', message: 'Please paste the Google Maps link' };
    if (!MAPS_PREFIXES.some((prefix) => link.startsWith(prefix))) {
      return { field: 'mapsLink', message: 'Please enter a valid Google Maps link' };
    }

    const price = Number(values.price);
    if (values.price.trim() === '' || isNaN(price) || price <= 0) {
      return { field: 'price', message: 'Please enter a valid price' };
    }

    const rooms = Number(values.rooms);
    if (values.rooms.trim() === '' || !Number.isInteger(rooms) || rooms < 1 || rooms > 20) {
      return { field: 'rooms', message: 'Rooms must be a whole number from 1 to 20' };
    }

    const area = Number(values.area);
    if (values.area.trim() === '' || isNaN(area) || area <= 0) {
      return { field: 'area', message: 'Please enter a valid area in m²' };
    }

    if (values.description.trim().length < MIN_DESCRIPTION) {
      return { field: 'description', message: `Description must be at least ${MIN_DESCRIPTION} characters` };
    }
    return null;
  }

  // returns true when the property was added, so the screen can navigate away
  function save(): boolean {
    const problem = validate();
    if (problem) {
      setError(problem);
      refs[problem.field].current?.focus();
      return false;
    }

    addProperty({
      id: `p${Date.now()}`,
      type: values.type,
      title: values.title.trim(),
      emoji: '🏠',
      location: values.location.trim(),
      compound: values.compound.trim(),
      address: values.address.trim(),
      mapsLink: values.mapsLink.trim(),
      price: Number(values.price),
      rooms: Number(values.rooms),
      area: Number(values.area),
      description: values.description.trim(),
      advertiserId: advertiser.id,
    });

    setValues(EMPTY);
    setError(null);
    return true;
  }

  return { values, setField, error, refs, save };
}