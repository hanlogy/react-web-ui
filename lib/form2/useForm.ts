import { useCallback, useRef } from 'react';
import type {
  FormControlElement,
  FormFieldValue,
  KeyOfFormData,
} from './types';
import { setControlElementValue } from './setControlElementValue';

/**
 * A **non-reactive** form state manager
 *
 * Form data:
 * - valid field key must be `string` type. (It is fine if FormDataT contains
 *   non-string keys.)
 * - field value can be `string | boolean | undefined`. `boolean` is for
 *   checkbox `<input>` only.
 */
export function useForm<
  FormDataT extends { [K in keyof FormDataT]: FormFieldValue | undefined },
  FormFieldNameT extends KeyOfFormData<FormDataT> = KeyOfFormData<FormDataT>,
>() {
  const unattachedValueRef = useRef<Partial<FormDataT>>({});

  // All fields that have attached `ref`, the unmouned is null.
  const formElementsRef = useRef<
    Partial<Record<FormFieldNameT, FormControlElement | null>>
  >({});

  const setFieldValue = useCallback(
    <K extends FormFieldNameT>(name: K, value: FormDataT[K]) => {
      if (formElementsRef.current[name]) {
        setControlElementValue(formElementsRef.current[name], value);
      } else {
        unattachedValueRef.current[name] = value;
      }
    },
    [],
  );

  const register = useCallback(
    <K extends FormFieldNameT>(fieldName: K) => {
      return {
        name: fieldName,
        ref: (element: FormControlElement | null) => {
          formElementsRef.current[fieldName] = element;
          if (!element) {
            return;
          }

          const unattachedValue = unattachedValueRef.current[fieldName];

          if (unattachedValue !== undefined) {
            setFieldValue(fieldName, unattachedValue);
            unattachedValueRef.current[fieldName] = undefined;
          }

          return () => {
            let value: FormDataT[K];
            if (
              element instanceof HTMLInputElement &&
              element.type === 'checkbox'
            ) {
              value = element.checked;
            } else {
              value = element.value;
            }

            unattachedValueRef.current[fieldName] = value;
          };
        },
      };
    },
    [setFieldValue],
  );

  return {
    register,
    setFieldValue,
  };
}

// Note:
// - The returned functions must be stable, wrapp it with `useCallback` if not.
// - radio inputs are not supported. Use distinct field names for each radio
//   input instead.
