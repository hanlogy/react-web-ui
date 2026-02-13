import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import type {
  FormDataBase,
  FormElementsClassNameBuilders,
  FormFieldController,
  InputPropsForForm,
  KeyOfFormData,
} from './types';
import {
  InputError,
  InputHelper,
  InputLabel,
} from '../components/inputs/elements';
import { resolveFieldStateClass } from './helpers';
import { clsx } from '../helpers/clsx';

// It is mostly align with M3 design, but still keep some of our design
// pholosipy
export function withFieldWrapper<T extends object>(
  Component: ComponentType<T>,
  {
    inputClass,
    labelClass,
    helperClass,
    errorClass,
  }: FormElementsClassNameBuilders = {},
  {
    isCheckbox = false,
  }: {
    isCheckbox?: boolean;
  } = {},
) {
  return <
    FormDataT extends FormDataBase<FormDataT>,
    FormFieldNameT extends KeyOfFormData<FormDataT>,
    FormFieldValueT extends FormDataT[FormFieldNameT],
  >({
    controller: { ref, name, setErrorListener },
    label,
    helper,
    ...rest
  }: InputPropsForForm<T> & {
    controller: FormFieldController<FormDataT, FormFieldNameT, FormFieldValueT>;
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
        {label && !isCheckbox && (
          <InputLabel
            className={resolveFieldStateClass(labelClass, { isError })}
          >
            {label}
          </InputLabel>
        )}

        <Component
          {...({
            name,
            ref,
            className: resolveFieldStateClass(
              isCheckbox ? labelClass : inputClass,
              { isError },
            ),
            ...(isCheckbox ? { label } : {}),
            ...rest,
          } as T)}
        />

        {helper && (
          <InputHelper
            className={clsx(
              { 'ml-3': isCheckbox },
              resolveFieldStateClass(helperClass, { isError }),
            )}
          >
            {helper}
          </InputHelper>
        )}

        {error && (
          <InputError
            className={clsx(
              { 'ml-3': isCheckbox },
              resolveFieldStateClass(errorClass, { isError }),
            )}
          >
            {error}
          </InputError>
        )}
      </div>
    );
  };
}
