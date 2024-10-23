import { G } from '@mobily/ts-belt';
import { unbox } from 'unbox-js';

import { defaultSubscriptionPermissionsKey } from '@/config/permissions/features';
import { api } from '@/lib/sdks/hubspot/api';

type SimplePublicObject = {
  id: string;
  properties: {
    email: string;
    lastName: string;
    firstName: string;
    notify_me: string;
    subscription_plan: string;
  };
};

type SimplePublicObjectError = {
  status: string;
  category: string;
  message: string;
};

type ClientData = {
  id?: string;
  email: string;
  lastName: string;
  firstName: string;
  notifyMe?: boolean;
  subscriptionPlan?: string;
};

const properties = ['email', 'firstName', 'lastName', 'notify_me', 'subscription_plan'];

const returnContact = (
  email: string,
  input?: ClientData,
  contact?: SimplePublicObject,
  error?: SimplePublicObjectError
): ClientData | null => {
  if (error) {
    console.error(error);
    return null;
  }

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
    id: contact.id,
    email: contact.properties.email || email,
    notifyMe: contact.properties.notify_me === 'true',
    subscriptionPlan: contact.properties.subscription_plan || '',
    lastName: contact.properties.lastName || (input ? input.lastName : ''),
    firstName: contact.properties.firstName || (input ? input.firstName : '')
  };
};

const returnData = (input: ClientData, data?: object) => {
  const contact = (data as { results: SimplePublicObject[] }).results[0];
  const contactError = (data as { errors: SimplePublicObjectError[] }).errors[0];
  return returnContact(input.email, input, contact, contactError);
};

export const getContact = async (email: string) => {
  const { data } = await unbox(
    api.crm.v3ObjectsContactsBatchReadCreate({
      properties,
      idProperty: 'email',
      inputs: [{ id: email }]
    })
  );

  return returnData({ email } as ClientData, data);
};

export const createContact = async (input: ClientData) => {
  const { data } = await unbox(
    api.crm.v3ObjectsContactsBatchCreateCreate({
      inputs: [
        {
          associations: [],
          properties: {
            email: input.email,
            lastName: input.lastName,
            firstName: input.firstName,
            notify_me: Boolean(input.notifyMe) ? 'true' : 'false',
            subscription_plan: input.subscriptionPlan ?? defaultSubscriptionPermissionsKey
          }
        }
      ]
    })
  );

  return returnData(input, data);
};

export const updateContact = async (input: ClientData, id: string) => {
  const { data } = await unbox(
    api.crm.v3ObjectsContactsBatchUpdateCreate({
      inputs: [
        {
          id,
          properties: {
            email: input.email,
            lastName: input.lastName,
            firstName: input.firstName,
            notify_me: Boolean(input.notifyMe) ? 'true' : 'false',
            subscription_plan: input.subscriptionPlan ?? defaultSubscriptionPermissionsKey
          }
        }
      ]
    })
  );

  return returnData(input, data);
};

export const upsertContact = async (input: ClientData) => {
  const contact = await getContact(input.email);
  return G.isNullable(contact?.id) ? createContact(input) : updateContact(input, contact.id);
};

export const getOrUpsertContact = async (input: ClientData) => {
  const contact = await getContact(input.email);
  return G.isNullable(contact) ? upsertContact(input) : contact;
};
