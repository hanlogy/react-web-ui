import { CheckboxInput } from '../components/inputs/CheckboxInput';
import { SelectInput } from '../components/inputs/SelectInput';
import { TextareaInput } from '../components/inputs/TextareaInput';
import { TextInput } from '../components/inputs/TextInput';
import type {
  CheckboxInputProps,
  SelectInputProps,
  TextareaInputProps,
  TextInputProps,
} from '../components/inputs/types';
import { createFormField } from './createFormField';
import type { FieldClassNameBuilders } from './types';

export function createTextField(
  classNameBuilders: FieldClassNameBuilders = {},
) {
  return createFormField<TextInputProps>((props) => {
    return <TextInput {...props} />;
  }, classNameBuilders);
}

export function createTextareaField(
  classNameBuilders: FieldClassNameBuilders = {},
) {
  return createFormField<TextareaInputProps>((props) => {
    return <TextareaInput {...props} />;
  }, classNameBuilders);
}

export function createSelectField(
  classNameBuilders: FieldClassNameBuilders = {},
) {
  return createFormField<SelectInputProps>((props) => {
    return <SelectInput {...props} />;
  }, classNameBuilders);
}

export function createCheckboxField(
  classNameBuilders: Omit<FieldClassNameBuilders, 'inputClass'> = {},
) {
  return createFormField<CheckboxInputProps>(
    (props) => {
      return <CheckboxInput {...props} />;
    },
    { ...classNameBuilders, isCheckbox: true },
  );
}
