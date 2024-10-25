import { config } from '@/lib/sdks/meticulous/config';

export const MeticulousScript = () => (
  <script
    src={config.scriptUrl}
    data-project-id={config.projectId}
    data-is-production-environment={config.isProductionEnvironment}
  />
);
