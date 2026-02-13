import type { FormControlElement, FormFieldValue } from './types';

/**
 * Apply a field value to a form control DOM element.
 *
 * - `undefined` is ignored (do not change the current DOM state).
 * - Checkbox `<input>` uses `checked` and treats only `true` as checked.
 * - Other controls use `value` and accept only `string`.
 */
export function setControlElementValue<T extends FormFieldValue>(
  element: FormControlElement,
  value: T | undefined,
) {
  if (value === undefined) {
    return;
  }

  if (element instanceof HTMLInputElement && element.type === 'checkbox') {
    element.checked = value === true;
  }

  if (typeof value !== 'string') {
    return;
  }

  element.value = value;
}
