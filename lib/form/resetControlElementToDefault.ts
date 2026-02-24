import type { FormControlElement } from './types';

export function resetControlElementToDefault(
  element: FormControlElement,
): void {
  if (element instanceof HTMLInputElement) {
    if (element.type === 'checkbox') {
      element.checked = element.defaultChecked;
      return;
    }

    element.value = element.defaultValue;
    return;
  }

  if (element instanceof HTMLSelectElement) {
    const options = element.options;
    let optionIndex = -1;

    for (let i = 0; i < options.length; i++) {
      if (options[i].defaultSelected) {
        optionIndex = i;
        break;
      }
    }

    // fallback if none had selected=""
    element.selectedIndex = optionIndex >= 0 ? optionIndex : 0;
    return;
  }

  if (element instanceof HTMLTextAreaElement) {
    element.value = element.defaultValue;
  }
}
