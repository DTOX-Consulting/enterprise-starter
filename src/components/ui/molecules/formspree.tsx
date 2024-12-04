'use client';

import { useForm, ValidationError } from '@formspree/react';

import { FadeIn } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/atoms/button-group';

import type { PropsWithChildren } from 'react';

export function Formspree({
  heading,
  formType,
  children,
  onSuccessText = '',
  onSuccessHeading = 'Submission Successful'
}: PropsWithChildren<{
  heading: string;
  formType: string;
  onSuccessText?: string;
  onSuccessHeading?: string;
}>) {
  const [state, handleSubmit] = useForm(formType);

  if (state.succeeded) {
    return (
      <FadeIn>
        <div className="flex h-full flex-col content-center items-center justify-center">
          <p className="flex text-3xl font-bold">{onSuccessHeading}</p>
          <p className="flex text-xl">{onSuccessText}</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(event);
        }}
      >
        <h2 className="font-display text-base font-semibold text-gray-11 dark:text-graydark-11">
          {heading}
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50 dark:bg-inherit">
          {children}
        </div>

        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <Button type="submit" className="float-right mt-10" disabled={state.submitting}>
          Submit
        </Button>
      </form>
    </FadeIn>
  );
}
