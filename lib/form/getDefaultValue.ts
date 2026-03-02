import type { FormControlElement, FormFieldValue } from './types';

export function getDefaultValue(
  element: FormControlElement,
): FormFieldValue | undefined {
  if (element instanceof HTMLInputElement) {
    if (element.type === 'checkbox') {
      return element.defaultChecked;
    }

    return element.defaultValue;
  }

  if (element instanceof HTMLSelectElement) {
    const options = element.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].defaultSelected) {
        return options[i].value;
      }
    }
  }

  if (element instanceof HTMLTextAreaElement) {
    return element.defaultValue;
  }
}
