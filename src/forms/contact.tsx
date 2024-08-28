'use client';

import { Input as TextInput } from '@/components/ui/atoms/input-group';
import { Formspree } from '@/components/ui/molecules/formspree';

export function ContactForm() {
  return (
    <Formspree
      heading="Inquiries"
      formType="contact"
      onSuccessHeading="Thanks for your submission!"
      onSuccessText="We will get back to you as soon as possible."
    >
      <TextInput label="Name" type="text" name="name" autoComplete="name" />
      <TextInput label="Email" type="email" name="email" autoComplete="email" />
      <TextInput label="Message" type="text" name="message" autoComplete="off" />
    </Formspree>
  );
}
