import { Crm } from '@/lib/sdks/hubspot/api/crm';
import { config } from '@/lib/sdks/hubspot/config';

const crm = new Crm({
  baseUrl: config.baseUrl,
  baseApiParams: {
    headers: {
      Authorization: `Bearer ${config.auth.API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
});

export const api = {
  crm
};
