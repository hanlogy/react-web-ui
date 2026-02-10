// TODO: We might create a HOC or a similar factory for select, text, textarea.

import type { ReactNode } from 'react';
import { TextInput } from '../components/inputs/TextInput';
import type { FormFieldController } from './useForm';
import { FormTextInputWrapper } from './FormTextInputWrapper';
import type {
  FormElementsClassNameBuilders,
  InputPropsForForm,
  StringKeyOf,
} from './types';
import type { TextInputProps } from '../components/inputs/types';

export function createTextField({
  inputClass,
  labelClass,
  helperClass,
  errorClass,
}: FormElementsClassNameBuilders) {
  return <FormDataT extends object, FieldNameT extends StringKeyOf<FormDataT>>({
    controller: { ref, setValue, name, setErrorListener },
    label,
    helper,
    ...rest
  }: InputPropsForForm<TextInputProps> & {
    controller: FormFieldController<FormDataT, string, FieldNameT>;
    label?: string | ReactNode;
    helper?: string | ReactNode;
  }) => {
    return (
      <FormTextInputWrapper
        {...{
          inputClass,
          labelClass,
          helperClass,
          errorClass,
          label,
          helper,
          setErrorListener,
        }}
      >
        {(className) => (
          <TextInput
            {...{
              name,
              ref,
              className,
              onChange: setValue
                ? (e) => setValue(e.currentTarget.value)
                : undefined,
              ...rest,
            }}
          />
        )}
      </FormTextInputWrapper>
    );
  };
}
