import eslintExtreme from 'eslint-config-extreme';

const config = [
  {
    ignores: [
      'src/iframe/',
      'report-bundle-size.js',
      'src/components/ui/organisms/chat/chat-message.tsx'
    ]
  },
  ...eslintExtreme.configs.typescript
];

export default config;
