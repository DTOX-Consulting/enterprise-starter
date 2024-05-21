import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const { getUser, isAuthenticated, getPermissions, getOrganization } = getKindeServerSession();
  const user = await getUser();
  const permissions = await getPermissions();
  const organization = await getOrganization();
  const authenticated = await isAuthenticated();

  return NextResponse.json({ user, authenticated, permissions, organization });
}
