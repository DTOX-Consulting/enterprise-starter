import { afterEach } from 'vitest';

// eslint-disable-next-line import-x/no-unassigned-import
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Learn more: https://github.com/testing-library/jest-dom

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
