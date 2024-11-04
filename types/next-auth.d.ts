import type { User } from 'next-auth';

declare module 'next-auth/jwt' {
  type JWT = {
    id: UserId;
  };
}

declare module 'next-auth' {
  type Session = {
    user: User & {
      id: UserId;
    };
  };
}
