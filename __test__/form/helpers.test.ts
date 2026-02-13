import {
  isFormValuesChanged,
  isFormFieldValueChanged,
} from '../../lib/form/helpers';
import type { FormFieldValue } from '../../lib/form/types';

interface FormData {
  name?: FormFieldValue | undefined;
  remark?: FormFieldValue | undefined;
  checked?: FormFieldValue | undefined;
}

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

describe('isFormValuesChanged', () => {
  test('same', () => {
    const A: FormData = { name: 'a', remark: 'b', checked: true };
    const B: FormData = { name: 'a', remark: 'b', checked: true };

    expect(isFormValuesChanged(A, B)).toBe(false);
  });

  test('string change', () => {
    const A: FormData = { name: 'a' };
    const B: FormData = { name: 'b' };

    expect(isFormValuesChanged(A, B)).toBe(true);
  });

  test('boolean change', () => {
    const A: FormData = { checked: false };
    const B: FormData = { checked: true };

    expect(isFormValuesChanged(A, B)).toBe(true);
  });

  test('string with missing key', () => {
    const A: FormData = { name: 'a' };
    const B: FormData = {};

    expect(isFormValuesChanged(A, B)).toBe(true);
  });

  test('boolean with missing key', () => {
    const A: FormData = { checked: true };
    const B: FormData = {};

    expect(isFormValuesChanged(A, B)).toBe(true);
  });

  test('empty string equals missing', () => {
    const A: FormData = { remark: '' };
    const B: FormData = {};

    expect(isFormValuesChanged(A, B)).toBe(false);
  });

  test('undefined equals to missing', () => {
    const A: FormData = { name: 'a' };
    const B: FormData = { name: 'a', remark: undefined };

    expect(isFormValuesChanged(A, B)).toBe(false);
  });
});
