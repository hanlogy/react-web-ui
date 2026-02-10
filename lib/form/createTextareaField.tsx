import type { ReactNode } from 'react';
import { TextareaInput } from '../components/inputs/TextareaInput';
import type { FormFieldController } from './useForm';
import { FormTextInputWrapper } from './FormTextInputWrapper';
import type {
  FormElementsClassNameBuilders,
  InputPropsForForm,
  StringKeyOf,
} from './types';
import type { TextareaInputProps } from '../components/inputs/types';

export function createTextareaField({
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
  }: InputPropsForForm<TextareaInputProps> & {
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
          <TextareaInput
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
