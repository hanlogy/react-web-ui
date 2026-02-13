import type { FormControlElement, FormFieldValue } from './types';

export function getControlElementValue(
  element: FormControlElement,
): FormFieldValue {
  if (element instanceof HTMLInputElement && element.type === 'checkbox') {
    return element.checked === true;
  }

  return element.value;
}
