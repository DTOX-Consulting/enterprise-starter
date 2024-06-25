'use server';

import '@/styles/speech-bubbles.css';

import Image from 'next/image';

import defaultUser from '@/assets/images/default-user.png';
import { authenticationRedirection } from '@/lib/auth/redirect';

export async function UserImage({ width = 64, height = 64 }) {
  const auth = await authenticationRedirection();

  return (
    <Image
      alt="Profile"
      width={width}
      height={height}
      src={auth?.user.picture ?? defaultUser}
      className="hidden size-16 rounded-full border bg-gray-200 sm:flex"
    />
  );
}
