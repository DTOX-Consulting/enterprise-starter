'use client';

import { useForm, ValidationError } from '@formspree/react';

import { FadeIn } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/atoms/button-group';
import { Input as TextInput } from '@/components/ui/atoms/input-group';

export function ContactForm() {
  const [state, handleSubmit] = useForm('contact');

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
        <h2 className="font-display text-base font-semibold text-neutral-950">Inquiries</h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" type="text" name="name" autoComplete="name" />
          <TextInput label="Email" type="email" name="email" autoComplete="email" />
          <TextInput label="Message" type="text" name="message" autoComplete="off" />
        </div>

        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <Button type="submit" className="float-right mt-10" disabled={state.submitting}>
          Submit
        </Button>
      </form>
    </FadeIn>
  );
}
