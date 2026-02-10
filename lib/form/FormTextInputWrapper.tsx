import { useEffect, useState, type ReactNode } from 'react';
import {
  InputError,
  InputHelper,
  InputLabel,
} from '../components/inputs/elements';
import type { FormElementsClassNameBuilders, FormErrorListener } from './types';
import { resolveFieldStateClass } from './helpers';

type FormSetFieldErrorListener = (listener: FormErrorListener) => void;

interface FormTextInputWrapperProps {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  children: ((inputClassName: string) => ReactNode) | ReactNode;
  setErrorListener?: FormSetFieldErrorListener;
}

// It is mostly align with M3 design, but still keep some of our design
// pholosipy
export function FormTextInputWrapper({
  label,
  helper,
  error: defaultError,
  children,
  inputClass,
  labelClass,
  helperClass,
  errorClass,
  setErrorListener,
}: FormTextInputWrapperProps & FormElementsClassNameBuilders) {
  const [error, setError] = useState(defaultError);
  const isError = !!error;

  useEffect(() => {
    setErrorListener?.(setError);
  }, [setErrorListener]);

  return (
    <div>
      {label && (
        <InputLabel className={resolveFieldStateClass(labelClass, { isError })}>
          {label}
        </InputLabel>
      )}

      {typeof children === 'function'
        ? children(resolveFieldStateClass(inputClass, { isError }))
        : children}

      {helper && (
        <InputHelper
          className={resolveFieldStateClass(helperClass, { isError })}
        >
          {helper}
        </InputHelper>
      )}

      {error && (
        <InputError className={resolveFieldStateClass(errorClass, { isError })}>
          {error}
        </InputError>
      )}
    </div>
  );
}
