import { config } from '@/lib/sdks/meticulous/config';

export const MeticulousScript = () => (
  // eslint-disable-next-line @next/next/no-sync-scripts
  <script
    src={config.scriptUrl}
    data-project-id={config.projectId}
    data-is-production-environment={config.isProductionEnvironment}
  />
);
