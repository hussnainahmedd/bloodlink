import { describe, expect, it } from 'vitest';
import {
  BLOOD_GROUPS,
  CAN_DONATE_TO,
  CAN_RECEIVE_FROM,
  type BloodGroup,
} from '../lib/demo';

/**
 * Expected 8x8 red blood cell compatibility matrix (Donor -> Recipient).
 * Columns: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
 */
const EXPECTED_MATRIX: Record<BloodGroup, Record<BloodGroup, boolean>> = {
  'O-': {
    'O-': true,
    'O+': true,
    'A-': true,
    'A+': true,
    'B-': true,
    'B+': true,
    'AB-': true,
    'AB+': true,
  },
  'O+': {
    'O-': false,
    'O+': true,
    'A-': false,
    'A+': true,
    'B-': false,
    'B+': true,
    'AB-': false,
    'AB+': true,
  },
  'A-': {
    'O-': false,
    'O+': false,
    'A-': true,
    'A+': true,
    'B-': false,
    'B+': false,
    'AB-': true,
    'AB+': true,
  },
  'A+': {
    'O-': false,
    'O+': false,
    'A-': false,
    'A+': true,
    'B-': false,
    'B+': false,
    'AB-': false,
    'AB+': true,
  },
  'B-': {
    'O-': false,
    'O+': false,
    'A-': false,
    'A+': false,
    'B-': true,
    'B+': true,
    'AB-': true,
    'AB+': true,
  },
  'B+': {
    'O-': false,
    'O+': false,
    'A-': false,
    'A+': false,
    'B-': false,
    'B+': true,
    'AB-': false,
    'AB+': true,
  },
  'AB-': {
    'O-': false,
    'O+': false,
    'A-': false,
    'A+': false,
    'B-': false,
    'B+': false,
    'AB-': true,
    'AB+': true,
  },
  'AB+': {
    'O-': false,
    'O+': false,
    'A-': false,
    'A+': false,
    'B-': false,
    'B+': false,
    'AB-': false,
    'AB+': true,
  },
};

describe('Blood Compatibility Matrix (8x8)', () => {
  it('defines all 8 standard blood groups', () => {
    expect(BLOOD_GROUPS).toHaveLength(8);
    expect(BLOOD_GROUPS).toEqual([
      'O-',
      'O+',
      'A-',
      'A+',
      'B-',
      'B+',
      'AB-',
      'AB+',
    ]);
  });

  describe('Universal Donor and Recipient rules', () => {
    it('O- can donate red cells to all 8 blood groups', () => {
      expect(CAN_DONATE_TO['O-']).toHaveLength(8);
      for (const recipient of BLOOD_GROUPS) {
        expect(CAN_DONATE_TO['O-']).toContain(recipient);
      }
    });

    it('O- can only receive from O-', () => {
      expect(CAN_RECEIVE_FROM['O-']).toEqual(['O-']);
    });

    it('AB+ can receive red cells from all 8 blood groups', () => {
      expect(CAN_RECEIVE_FROM['AB+']).toHaveLength(8);
      for (const donor of BLOOD_GROUPS) {
        expect(CAN_RECEIVE_FROM['AB+']).toContain(donor);
      }
    });

    it('AB+ can only donate red cells to AB+', () => {
      expect(CAN_DONATE_TO['AB+']).toEqual(['AB+']);
    });
  });

  describe('Reciprocal consistency between CAN_DONATE_TO and CAN_RECEIVE_FROM', () => {
    it('ensures CAN_DONATE_TO and CAN_RECEIVE_FROM are bidirectional for all 64 pairs', () => {
      let pairCount = 0;
      for (const donor of BLOOD_GROUPS) {
        for (const recipient of BLOOD_GROUPS) {
          pairCount += 1;
          const canDonate = CAN_DONATE_TO[donor].includes(recipient);
          const canReceive = CAN_RECEIVE_FROM[recipient].includes(donor);
          expect(
            canDonate,
            `Inconsistency: donor ${donor} -> recipient ${recipient} mismatch between CAN_DONATE_TO and CAN_RECEIVE_FROM`
          ).toBe(canReceive);
        }
      }
      expect(pairCount).toBe(64);
    });
  });

  describe('All 64 individual Donor -> Recipient pairs', () => {
    const allPairs: Array<{
      donor: BloodGroup;
      recipient: BloodGroup;
      compatible: boolean;
    }> = [];

    for (const donor of BLOOD_GROUPS) {
      for (const recipient of BLOOD_GROUPS) {
        allPairs.push({
          donor,
          recipient,
          compatible: EXPECTED_MATRIX[donor][recipient],
        });
      }
    }

    it('generates exactly 64 test cases', () => {
      expect(allPairs).toHaveLength(64);
    });

    allPairs.forEach(({ donor, recipient, compatible }) => {
      const verb = compatible ? 'can donate to' : 'cannot donate to';
      it(`${donor} ${verb} ${recipient}`, () => {
        const canDonate = CAN_DONATE_TO[donor].includes(recipient);
        const canReceive = CAN_RECEIVE_FROM[recipient].includes(donor);

        expect(canDonate).toBe(compatible);
        expect(canReceive).toBe(compatible);
      });
    });
  });
});
