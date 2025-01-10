'use client';

import { useForm, ValidationError } from '@formspree/react';

import { Button } from '@/components/ui/atoms/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/atoms/card';
import { Input } from '@/components/ui/atoms/input';
import {
  SUBSCRIBE_FORM_ID,
  SUBSCRIBE_FORM_SUCCESS_TEXT,
  SUBSCRIBE_FORM_TITLE_TEXT
} from '@/components/ui/layouts/landing-page/components/constants';

export default function SubscribeForm() {
  const [state, handleSubmit] = useForm(SUBSCRIBE_FORM_ID);

  if (state.succeeded) {
    return (
      <p className="text-center text-green-600 font-semibold">{SUBSCRIBE_FORM_SUCCESS_TEXT}</p>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-light text-center">{SUBSCRIBE_FORM_TITLE_TEXT}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="name" type="text" name="name" placeholder="Name" required />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
          <Input id="email" type="email" name="email" placeholder="Email" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <Button type="submit" className="w-full" disabled={state.submitting}>
            {state.submitting ? 'Submitting...' : 'Subscribe'}
          </Button>
          <ValidationError errors={state.errors} />
        </form>
      </CardContent>
    </Card>
  );
}
