import { isFormFieldValueChanged } from '../../lib/form/helpers';

describe('isFormFieldValueChanged', () => {
  test('both boolean', () => {
    expect(isFormFieldValueChanged(true, true)).toBe(false);
    expect(isFormFieldValueChanged(false, true)).toBe(true);
  });

  test('boolean and undefined', () => {
    expect(isFormFieldValueChanged(true, undefined)).toBe(true);
    expect(isFormFieldValueChanged(false, undefined)).toBe(false);
  });

  test('both string', () => {
    expect(isFormFieldValueChanged('', '')).toBe(false);
    expect(isFormFieldValueChanged('', '1')).toBe(true);
  });

  test('string and undefined', () => {
    expect(isFormFieldValueChanged(undefined, '')).toBe(false);
    expect(isFormFieldValueChanged(undefined, '1')).toBe(true);
  });

  test('both undefined', () => {
    expect(isFormFieldValueChanged(undefined, undefined)).toBe(false);
  });
});
