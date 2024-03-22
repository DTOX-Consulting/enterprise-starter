'use client';

import { useForm, ValidationError } from '@formspree/react';
import { useState } from 'react';

import { FadeIn } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/atoms/button-group';
import { Input as TextInput } from '@/components/ui/atoms/input-group';
import { Label } from '@/components/ui/atoms/label';
import { RadioGroupButton, RadioGroupButtonItem } from '@/components/ui/atoms/radio-group-button';
import { cn } from '@/lib/utils';

export function TravelForm() {
  const [state, handleSubmit] = useForm('travel');
  const [preferencesShown, showPreferences] = useState(false);

  if (state.succeeded) {
    return (
      <FadeIn>
        <div className="flex h-full flex-col content-center items-center justify-center">
          <p className="flex text-3xl font-bold">Thanks for your submission!</p>
          <p className="flex text-xl">We will get back to you as soon as possible.</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Enter your details here
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <div className={preferencesShown ? 'hidden' : ''}>
            <TextInput label="Name" type="text" required={true} name="name" autoComplete="name" />

            <TextInput
              label="Where do you want to go?"
              type="text"
              required={true}
              name="destination"
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <TextInput
                label="Email"
                type="email"
                name="email"
                required={true}
                autoComplete="email"
                className="border-separate group-first:rounded-none group-last:rounded-none"
              />
              <TextInput
                label="Phone Number"
                type="tel"
                name="phone"
                autoComplete="tel"
                className="border-separate group-first:rounded-none group-last:rounded-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <TextInput
                label="Start Date"
                type="date"
                name="from"
                required={true}
                autoComplete="off"
                className="border-separate group-first:rounded-none group-last:rounded-none"
              />
              <TextInput
                label="End Date"
                type="date"
                name="to"
                required={true}
                autoComplete="off"
                className="border-separate group-first:rounded-none group-last:rounded-none"
              />
            </div>
            <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
              <fieldset className="grid grid-cols-1 sm:grid-cols-3">
                <legend className="text-base/6 text-neutral-500">How Many People</legend>
                <TextInput
                  label="Adults"
                  type="number"
                  name="adults"
                  autoComplete="off"
                  className="border-separate border-0 border-b group-first:rounded-none group-last:rounded-none"
                />
                <TextInput
                  label="Children (2-11)"
                  type="number"
                  name="children"
                  autoComplete="off"
                  className="border-separate border-0 border-b group-first:rounded-none group-last:rounded-none"
                />
                <TextInput
                  label="Infants"
                  type="number"
                  name="infants"
                  autoComplete="off"
                  className="border-separate border-0 border-b group-first:rounded-none group-last:rounded-none"
                />
              </fieldset>
            </div>
            <TextInput
              label="Your budget (£)"
              type="number"
              name="budget"
              autoComplete="off"
              step={100}
            />
            <TextInput label="Special Requests" type="text" name="special" autoComplete="off" />
          </div>

          <div
            className={cn(
              'rounded-t-2xl border border-neutral-300 px-6 py-8 last:rounded-b-2xl',
              preferencesShown ? '' : 'hidden'
            )}
          >
            <fieldset>
              <legend className="text-base/6 text-neutral-500">
                Travel Preferences (You do not need to answer all)
              </legend>
              <div className="mt-6 grid grid-cols-1 gap-8">
                {preferences.map((preference) => (
                  <div key={preference.value}>
                    <Label className="mb-4 flex" htmlFor={preference.value}>
                      {preference.label}
                    </Label>
                    <RadioGroupButton
                      defaultValue="default"
                      key={preference.value}
                      name={preference.name}
                      className="grid-cols-3"
                    >
                      {items.map((item) => (
                        <RadioGroupButtonItem key={item.value} value={item.value}>
                          {item.label}
                        </RadioGroupButtonItem>
                      ))}
                    </RadioGroupButton>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <Button
          type="button"
          className="float-left mt-10"
          disabled={state.submitting}
          onClick={() => {
            showPreferences(!preferencesShown);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }}
        >
          {preferencesShown ? 'Set Details' : 'Set Preferences'}
        </Button>
        <Button type="submit" className="float-right mt-10" disabled={state.submitting}>
          Submit
        </Button>
      </form>
    </FadeIn>
  );
}

const items = [
  { label: 'Hate', value: 'hate' },
  { label: "Don't Care", value: 'default' },
  { label: 'Love', value: 'love' }
];

const preferences = [
  { label: 'Honeymoon', name: 'honeymoon', value: 'honeymoon' },
  { label: 'Anniversary', name: 'anniversary', value: 'anniversary' },
  { label: 'Birthday', name: 'birthday', value: 'birthday' },
  { label: 'Holiday in the Sun', name: 'holiday-sun', value: 'holiday-sun' },
  { label: 'Holiday in the Mountains', name: 'holiday-mountains', value: 'holiday-mountains' },
  { label: 'Staycations', name: 'staycations', value: 'staycations' },
  { label: 'City Break', name: 'city-break', value: 'city-break' },
  { label: 'Winter Sports', name: 'winter-sports', value: 'winter-sports' },
  { label: 'Summer All Around', name: 'summer-all-around', value: 'summer-all-around' },
  { label: 'Romantic Escape', name: 'romantic-escape', value: 'romantic-escape' },
  { label: 'Relaxation', name: 'relaxation', value: 'relaxation' },
  { label: 'Nature', name: 'nature', value: 'nature' },
  { label: 'Adventure', name: 'adventure', value: 'adventure' },
  { label: 'Adrenaline Outdoor', name: 'adrenaline-outdoor', value: 'adrenaline-outdoor' },
  { label: 'Relaxing Outdoor', name: 'relaxing-outdoor', value: 'relaxing-outdoor' },
  {
    label: 'Cultural Escape (History & Heritage)',
    name: 'cultural-escape',
    value: 'cultural-escape'
  },
  { label: 'Spa, Spa & Spa', name: 'spa', value: 'spa' },
  { label: 'Food Lover Discovery', name: 'food-lover-discovery', value: 'food-lover-discovery' },
  { label: 'Wine Discovery', name: 'wine-discovery', value: 'wine-discovery' },
  { label: 'Family with Toddlers', name: 'family-toddlers', value: 'family-toddlers' },
  { label: 'Family with Children', name: 'family-children', value: 'family-children' },
  { label: 'Family with Teenagers', name: 'family-teenagers', value: 'family-teenagers' },
  { label: 'Family with Young Adults', name: 'family-young-adults', value: 'family-young-adults' },
  { label: 'Group', name: 'group', value: 'group' },
  { label: 'Couples', name: 'couples', value: 'couples' },
  { label: 'Solo', name: 'solo', value: 'solo' },
  { label: 'Walking & Trekking', name: 'walking-trekking', value: 'walking-trekking' },
  { label: 'Diving', name: 'diving', value: 'diving' },
  { label: 'Bike Holidays', name: 'bike-holidays', value: 'bike-holidays' },
  { label: 'Hidden Gems', name: 'hidden-gems', value: 'hidden-gems' },
  { label: 'Wildlife', name: 'wildlife', value: 'wildlife' },
  { label: 'Retreat', name: 'retreat', value: 'retreat' },
  { label: 'Conservation', name: 'conservation', value: 'conservation' },
  { label: 'Give Back / Charities', name: 'give-back-charities', value: 'give-back-charities' },
  { label: 'Short Escape', name: 'short-escape', value: 'short-escape' },
  { label: 'Long Journeys', name: 'long-journeys', value: 'long-journeys' }
];
