import { G } from '@mobily/ts-belt';
import { unbox } from 'unbox-js';

import { defaultSubscriptionPermissionsKey } from '@/config/permissions/features';
import { wix } from '@/lib/sdks/wix/client';

type ClientData = {
  id?: string;
  revision?: number;
  email: string;
  lastName: string;
  firstName: string;
  notifyMe?: boolean;
  subscriptionPlan?: string;
};

type Contact = Awaited<ReturnType<typeof wix.contacts.getContact>>;

const returnContact = (email: string, input?: ClientData, contact?: Contact): ClientData | null => {
  if (G.isNullable(contact)) {
    return {
      email,
      lastName: '',
      firstName: '',
      notifyMe: false,
      subscriptionPlan: ''
    };
  }

  return {
    email,
    id: contact._id,
    revision: contact.revision,
    lastName: contact.info?.name?.last ?? '',
    firstName: contact.info?.name?.first ?? '',
    notifyMe: contact.info?.extendedFields?.items?.['custom.notify'] === 'yes',
    subscriptionPlan: (contact.info?.extendedFields?.items?.['custom.subscription'] as string) || ''
  };
};

const returnData = (input: ClientData, data?: object) => {
  const contact = data as Contact;
  return returnContact(input.email, input, contact);
};

export const getContact = async (email: string) => {
  const { data } = await unbox(wix.contacts.queryContacts().eq('primaryInfo.email', email).find());

  return returnData({ email } as ClientData, data?.items[0]);
};

export const createContact = async (input: ClientData) => {
  const { data } = await unbox(
    wix.contacts.createContact({
      emails: { items: [{ email: input.email }] },
      name: { first: input.firstName, last: input.lastName },
      extendedFields: {
        items: {
          'custom.notify': G.isNotNullable(input.notifyMe) && input.notifyMe ? 'yes' : 'no',
          'custom.subscription': input.subscriptionPlan ?? defaultSubscriptionPermissionsKey
        }
      }
    })
  );

  return returnData(input, data);
};

export const updateContact = async (input: ClientData, id: string, revision: number) => {
  const { data } = await unbox(
    wix.contacts.updateContact(
      id,
      {
        emails: { items: [{ email: input.email }] },
        name: { first: input.firstName, last: input.lastName },
        extendedFields: {
          items: {
            'custom.notify': G.isNotNullable(input.notifyMe) && input.notifyMe ? 'yes' : 'no',
            'custom.subscription': input.subscriptionPlan ?? defaultSubscriptionPermissionsKey
          }
        }
      },
      revision
    )
  );

  return returnData(input, data);
};

export const upsertContact = async (input: ClientData) => {
  const contact = await getContact(input.email);
  return G.isNullable(contact?.id) || G.isNullable(contact.revision)
    ? createContact(input)
    : updateContact(input, contact.id, contact.revision);
};

export const getOrUpsertContact = async (input: ClientData) => {
  const contact = await getContact(input.email);
  return G.isNullable(contact) ? upsertContact(input) : contact;
};
