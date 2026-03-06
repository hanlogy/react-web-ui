import { useEffect, useState, type ReactNode } from 'react';
import type {
  FormDataConstraint,
  FieldClassNameBuilders,
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
export function createFormField<T extends object>(
  inputRender: (props: T) => ReactNode,
  {
    inputClass,
    labelClass,
    helperClass,
    errorClass,
    isCheckbox,
  }: FieldClassNameBuilders & {
    isCheckbox?: boolean;
  } = {},
) {
  return <
    FormDataT extends FormDataConstraint<FormDataT>,
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

    // We need a cast here because TypeScript cannot infer the final spread
    // object as T.
    const inputProps = {
      name,
      ref,
      className: resolveFieldStateClass(isCheckbox ? labelClass : inputClass, {
        isError,
      }),
      ...(isCheckbox ? { label } : {}),
      ...rest,
    } as T;

    return (
      <div data-role="formField">
        {label && !isCheckbox && (
          <InputLabel
            className={resolveFieldStateClass(labelClass, { isError })}
          >
            {label}
          </InputLabel>
        )}

        {inputRender(inputProps)}

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
