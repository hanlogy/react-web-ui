import { CheckboxInput } from '../components/inputs/CheckboxInput';
import { SelectInput } from '../components/inputs/SelectInput';
import { TextareaInput } from '../components/inputs/TextareaInput';
import { TextInput } from '../components/inputs/TextInput';
import type { FormElementsClassNameBuilders } from './types';
import { withFieldWrapper } from './withFieldWrapper';

export function createTextField(
  classNameBuilders: FormElementsClassNameBuilders = {},
) {
  return withFieldWrapper(TextInput, classNameBuilders);
}

export function createTextareaField(
  classNameBuilders: FormElementsClassNameBuilders = {},
) {
  return withFieldWrapper(TextareaInput, classNameBuilders);
}

export function createSelectField(
  classNameBuilders: FormElementsClassNameBuilders = {},
) {
  return withFieldWrapper(SelectInput, classNameBuilders);
}

export function createCheckboxField(
  classNameBuilders: Omit<FormElementsClassNameBuilders, 'inputClass'> = {},
) {
  return withFieldWrapper(CheckboxInput, classNameBuilders, {
    isCheckbox: true,
  });
}
