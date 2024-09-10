import eslintExtreme from 'eslint-config-extreme';

const config = [
  {
    ignores: ['src/iframe/', 'src/components/ui/organisms/chat/chat-message.tsx']
  },
  ...eslintExtreme.configs.typescript
];

export default config;
