import { describe, expect, it } from 'vitest';

import { isDeepEqual } from '@/lib/utils/deep-equal';

describe('isDeepEqual', () => {
  it('returns true if deepEqual', () => {
    expect.assertions(1);
    const result = isDeepEqual({ a: 1 }, { a: 1 });
    expect(result).toBe(true);
  });
  it('returns false if not deepEqual', () => {
    expect.assertions(1);
    const result = isDeepEqual({ a: 1 }, { a: 2 });
    expect(result).toBe(false);
  });
  it('returns false if deepEqual undefined', () => {
    expect.assertions(1);
    const result = isDeepEqual(undefined, undefined);
    expect(result).toBe(false);
  });
  it('returns false if deepEqual null', () => {
    expect.assertions(1);
    const result = isDeepEqual(null, null);
    expect(result).toBe(false);
  });
  it('returns true if deepEqual boolean', () => {
    expect.assertions(1);
    const result = isDeepEqual(true, true);
    expect(result).toBe(true);
  });
  it('returns false if not deepEqual boolean', () => {
    expect.assertions(1);
    const result = isDeepEqual(true, false);
    expect(result).toBe(false);
  });
  it('returns false if not deepEqual array', () => {
    expect.assertions(1);
    const result = isDeepEqual([1, 2], [2, 3]);
    expect(result).toBe(false);
  });
  it('returns true if deepEqual array', () => {
    expect.assertions(1);
    const result = isDeepEqual([2, 3], [2, 3]);
    expect(result).toBe(true);
  });
  it('returns true if nested deepEqual', () => {
    expect.assertions(1);
    const result = isDeepEqual({ a: { b: [2, 3] } }, { a: { b: [2, 3] } });
    expect(result).toBe(true);
  });
  it('returns false if nested not deepEqual', () => {
    expect.assertions(1);
    const result = isDeepEqual({ a: { b: [2, 3] } }, { a: { b: [2, 1] } });
    expect(result).toBe(false);
  });
});
