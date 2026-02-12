import { useEffect, useState, type ReactNode } from 'react';
import { CheckboxInput } from '../components/inputs/CheckboxInput';
import type { FormFieldController } from './useForm';
import { resolveFieldStateClass } from './helpers';
import type {
  FormElementsClassNameBuilders,
  InputPropsForForm,
  StringKeyOf,
} from './types';
import type { CheckboxInputProps } from '../components/inputs/types';
import { InputError, InputHelper } from '../components/inputs/elements';

export function createCheckboxField({
  labelClass,
  helperClass,
  errorClass,
}: Omit<FormElementsClassNameBuilders, 'inputClass'> = {}) {
  return <FormDataT extends object, FieldNameT extends StringKeyOf<FormDataT>>({
    controller: { ref, setValue, name, setErrorListener },
    label,
    helper,
    ...rest
  }: InputPropsForForm<CheckboxInputProps> & {
    controller: FormFieldController<FormDataT, boolean, FieldNameT>;
    label?: string | ReactNode;
    helper?: string | ReactNode;
  }) => {
    const [error, setError] = useState<string | undefined>();
    const isError = !!error;

    useEffect(() => {
      setErrorListener?.(setError);
    }, [setErrorListener]);

    return (
      <div>
        <CheckboxInput
          {...{
            ref,
            className:
              typeof labelClass === 'function'
                ? labelClass({ isError })
                : labelClass,
            name,
            label,
            onChange: (e) => {
              setValue?.(e.currentTarget.checked);
            },
            ...rest,
          }}
        />
        {helper && (
          <div className="pl-3">
            <InputHelper
              className={resolveFieldStateClass(helperClass, { isError })}
            >
              {helper}
            </InputHelper>
          </div>
        )}

        {error && (
          <div className="pl-3">
            <InputError
              className={resolveFieldStateClass(errorClass, { isError })}
            >
              {error}
            </InputError>
          </div>
        )}
      </div>
    );
  };
}
