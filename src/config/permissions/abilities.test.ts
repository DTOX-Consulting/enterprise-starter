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
  it('Creating a business', () => {
    const { abilities1, abilities2, abilities3, abilities4, testUser1 } = setupTest();
    expect(abilities1.can('create', subjects.createBusiness(testUser1))).toBe(false);
    expect(abilities2.can('create', 'Business')).toBe(true);
    expect(abilities3.can('create', 'Business')).toBe(true);
    expect(abilities4.can('create', 'Business')).toBe(true);
  });

  it('Creating an organization', () => {
    const { abilities1, abilities2, abilities3, abilities4 } = setupTest();
    expect(abilities1.can('create', 'Organization')).toBe(false);
    expect(abilities2.can('create', 'Organization')).toBe(true);
    expect(abilities3.can('create', 'Organization')).toBe(true);
    expect(abilities4.can('create', 'Organization')).toBe(false);
  });

  it('Creating a team', () => {
    const { abilities1, abilities2, abilities3, abilities4 } = setupTest();
    expect(abilities1.can('create', 'Team')).toBe(false);
    expect(abilities2.can('create', 'Team')).toBe(true);
    expect(abilities3.can('create', 'Team')).toBe(false);
    expect(abilities4.can('create', 'Team')).toBe(true);
  });

  it('Viewing history', () => {
    const { abilities1, abilities2, abilities3, abilities4, testUser1 } = setupTest();
    expect(abilities1.can('view', subjects.viewHistory(testUser1))).toBe(false);
    expect(abilities2.can('view', 'History')).toBe(true);
    expect(abilities3.can('view', 'History')).toBe(true);
    expect(abilities4.can('view', 'History')).toBe(true);
  });

  it('Refine an idea', () => {
    const { abilities1, abilities2, abilities3, abilities4 } = setupTest();
    expect(abilities1.can('refine', 'Idea')).toBe(true);
    expect(abilities2.can('refine', 'Idea')).toBe(true);
    expect(abilities3.can('refine', 'Idea')).toBe(true);
    expect(abilities4.can('refine', 'Idea')).toBe(true);
  });

  it('Share an idea', () => {
    const {
      abilities1,
      abilities2,
      abilities3,
      abilities4,
      testUser1,
      testUser2,
      testUser3,
      testUser4
    } = setupTest();

    expect(abilities1.can('share', subjects.shareIdea(testUser1, 'oneTimePasscode'))).toBe(false);
    expect(abilities2.can('share', subjects.shareIdea(testUser2, 'passwordProtection'))).toBe(true);
    expect(abilities3.can('share', subjects.shareIdea(testUser3, 'simple'))).toBe(true);
    expect(abilities4.can('share', subjects.shareIdea(testUser4, 'emailRestrictions'))).toBe(true);
  });

  it('Iterate a business feature', () => {
    const { abilities1, abilities2 } = setupTest();
    expect(abilities1.can('iterate', 'BusinessFeatureNLP')).toBe(false);
    expect(abilities2.can('iterate', 'BusinessFeatureNLP')).toBe(true);
    expect(abilities1.can('iterate', subjects.iterateBusinessFeature('name'))).toBe(true);
    expect(abilities1.can('iterate', subjects.iterateBusinessFeature('vision'))).toBe(true);
    expect(abilities2.can('iterate', subjects.iterateBusinessFeature('image'))).toBe(true);
  });
});
