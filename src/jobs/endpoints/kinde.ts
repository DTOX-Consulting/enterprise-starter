import { client } from '@/trigger';

export const kinde = client.defineHttpEndpoint({
  //this should be unique inside your project
  id: 'kinde',
  //usually you'd use the domain name of the service
  source: 'kinde.com',
  //the icon is optional, it displays in the dashboard
  icon: 'https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/f925249f-50b2-4367-b34e-7a0d38c88f50.jpeg',
  //this function is called when a webhook is received
  verify: async (_request) => {
    await Promise.resolve();
    return { success: true };
  }
});
