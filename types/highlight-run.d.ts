import type { withHighlightConfig } from '@highlight-run/next/config';

type HighlightConfigOptions = NonNullable<Parameters<typeof withHighlightConfig>[1]>;
export type { HighlightConfigOptions };
