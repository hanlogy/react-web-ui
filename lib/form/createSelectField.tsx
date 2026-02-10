import type { ReactNode } from 'react';
import { SelectInput } from '../components/inputs/SelectInput';
import type { FormFieldController } from './useForm';
import { FormTextInputWrapper } from './FormTextInputWrapper';
import type {
  FormElementsClassNameBuilders,
  InputPropsForForm,
  StringKeyOf,
} from './types';
import type { SelectInputProps } from '../components/inputs/types';

export function createSelectField({
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
  }: InputPropsForForm<SelectInputProps> & {
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
          <SelectInput
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
