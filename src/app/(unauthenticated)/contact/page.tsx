import { Container } from '@/components/ui/atoms/container';
import { PageIntro } from '@/components/ui/molecules/page-intro';
import { ContactDetails } from '@/components/ui/organisms/social/contact-details';
import { ContactForm } from '@/forms/contact';

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact us" title="How can we help you">
        <p>We can&apos;t wait to hear from you.</p>
      </PageIntro>

      <Container className="mb-8 mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ContactDetails>
              We are here to help you in anyway possible 24/7. Just drop a message and we will get
              back to you as soon as possible.
            </ContactDetails>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
