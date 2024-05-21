import { authenticationRedirection } from '@/lib/auth/redirect';

export default async function IndexPage() {
  await authenticationRedirection({
    redirectWhenAuthenticated: true,
    replace: true
  });
}
