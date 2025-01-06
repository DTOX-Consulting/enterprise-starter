import { protectedProcedure, publicProcedure } from '@/trpc';

import type { ProcedureBuilderParams } from '@/trpc/types';

/**
 * Creates a procedure that can handle FormData requests
 * This middleware will parse FormData requests and pass them to the next handler
 * Regular requests will be passed through unchanged
 */
export const createFormDataProcedure = <
  S extends boolean | undefined = undefined,
  T extends ProcedureBuilderParams<S> = ProcedureBuilderParams<S>
>(
  procedure: T
) =>
  procedure.use(async ({ ctx, next }) => {
    const req = ctx.request;

    const hasFormData = Boolean(req.headers.get('content-type')?.includes('multipart/form-data'));

    // Check if this is a FormData request
    if (!hasFormData) {
      return next();
    }

    // Parse the FormData
    const formData = await req.formData();

    return next({
      rawInput: formData
    });
  });

// Export pre-configured FormData procedures
export const publicFormDataProcedure = createFormDataProcedure(publicProcedure);
export const protectedFormDataProcedure = createFormDataProcedure<true>(
  protectedProcedure as ProcedureBuilderParams<true>
);
