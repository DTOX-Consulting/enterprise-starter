import { describe, it, expect } from 'vitest';

import { defineAbilitiesFor, subjects } from '@/config/permissions/abilities';

import type { AbilityUser } from '@/config/permissions/abilities';

const setupTest = () => {
  const testUser1: AbilityUser = {
    id: '1',
    tier: 'starter',
    meta: {
      historyCount: 4,
      businessCount: 1,
      organizationCount: 1
    }
  };

  const testUser2: AbilityUser = {
    id: '2',
    tier: 'team',
    meta: {
      historyCount: 2,
      businessCount: 1,
      organizationCount: 1
    }
  };

  const testUser3: AbilityUser = {
    id: '3',
    tier: 'starter',
    meta: {
      historyCount: 0,
      businessCount: 0,
      organizationCount: 0
    }
  };

  const testUser4: AbilityUser = {
    id: '4',
    tier: 'team',
    meta: {
      historyCount: 5,
      businessCount: 5,
      organizationCount: 5
    }
  };

  const abilities1 = defineAbilitiesFor(testUser1);
  const abilities2 = defineAbilitiesFor(testUser2);
  const abilities3 = defineAbilitiesFor(testUser3);
  const abilities4 = defineAbilitiesFor(testUser4);

  return {
    testUser1,
    testUser2,
    testUser3,
    testUser4,
    abilities1,
    abilities2,
    abilities3,
    abilities4
  };
};

describe('User abilities', () => {
  it('Creating a ENTITY', () => {
    const { abilities1, abilities2, abilities3, abilities4, testUser1 } = setupTest();
    expect(abilities1.can('create', subjects.createEntity('Team', testUser1))).toBe(true);
    expect(abilities2.can('create', 'Entity')).toBe(true);
  });
});
