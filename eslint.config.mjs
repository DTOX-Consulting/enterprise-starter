import eslintExtreme from 'eslint-config-extreme';

const config = [
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/.trigger/**',
      '**/coverage/**',
      '**/node_modules/**',
      'src/iframe/',
      'storybook-static',
      'src/components/ui/organisms/chat/chat-message.tsx'
    ]
  },
  ...eslintExtreme.configs.typescript,
  {
    rules: {
      'no-console': 'off'
    }
  }
];

export default config;
