import type { GenericAny, GenericObject } from '@/lib/utils/object';
import type { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import type { ProcedureBuilder, ProcedureParams, AnyRootConfig } from '@trpc/server';
import type { NextRequest } from 'next/server';

export type Context<S extends boolean | undefined> = {
  request: NextRequest;
  headers: Headers;
  session: {
    user: S extends true
      ? KindeUser<Record<string, GenericAny>>
      : S extends false
        ? null
        : KindeUser<Record<string, GenericAny>> | null;
  };
};

export type ContextWithUser = Context<true>;
export type ContextWithoutUser = Context<false>;
export type ContextWithOptionalUser = Context<undefined>;

export type ProcedureBuilderParams<S extends boolean | undefined = undefined> = ProcedureBuilder<
  ProcedureParams<
    AnyRootConfig,
    Context<S>,
    GenericAny,
    GenericAny,
    GenericAny,
    GenericAny,
    GenericObject
  >
>;

export type SessionWithNonNullableUser = ContextWithOptionalUser['session'] & {
  user: NonNullable<ContextWithOptionalUser['session']['user']>;
};
