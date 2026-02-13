import { useCallback, useRef } from 'react';
import type {
  DefaultFormData,
  FormControlElement,
  FormDataBase,
  FormErrorListener,
  FormFieldController,
  FormFieldRegisterOptions,
  FormFieldsCollectionOptions,
  KeyOfFormData,
  FormValueChangeListener,
} from './types';
import { setControlElementValue } from './setControlElementValue';
import { getControlElementValue } from './getControlElementValue';
import { collectValues } from './collectValues';
import { isFormFieldValueChanged } from './helpers';

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
  FormDataT extends FormDataBase<FormDataT> = DefaultFormData,
>() {
  type FormFieldNameT = KeyOfFormData<FormDataT>;

  const initializedRef = useRef<boolean>(false);

  // null when unmounted
  const registeredElementsRef = useRef<
    Partial<Record<keyof FormDataT, FormControlElement | null>>
  >({});

  const registeredOptionsRef = useRef<
    Partial<Record<keyof FormDataT, FormFieldRegisterOptions<FormDataT>>>
  >({});

  // Fields have ever changed value.
  const dirtyFieldsRef = useRef<Set<keyof FormDataT>>(new Set());

  const unattachedValuesRef = useRef<Partial<FormDataT>>({});

  // Only for onValueChange
  const prevousValuesRef = useRef<Partial<FormDataT>>({});

  const fieldErrorsRef = useRef<
    Partial<Record<keyof FormDataT, string | undefined>>
  >({});

  const fieldErrorListenersRef = useRef<
    Partial<Record<keyof FormDataT, FormErrorListener | undefined>>
  >({});

  const formErrorRef = useRef<{ listener?: FormErrorListener; error?: string }>(
    {},
  );

  const valuesChangeListenerRef =
    useRef<FormValueChangeListener<FormDataT>>(undefined);

  // Only returns the values of the mounted elements when allFields is false.
  const getValues = useCallback(
    (
      options: FormFieldsCollectionOptions<FormFieldNameT> = {},
    ): Partial<FormDataT> => {
      return collectValues(
        registeredElementsRef.current,
        unattachedValuesRef.current,
        options,
      );
    },
    [],
  );

  const setFieldError = useCallback((field: FormFieldNameT, error?: string) => {
    if (fieldErrorsRef.current[field] === error) {
      return;
    }

    fieldErrorsRef.current = {
      ...fieldErrorsRef.current,
      [field]: error,
    };
    fieldErrorListenersRef.current[field]?.(error);
  }, []);

  const setFormError = useCallback((error?: string) => {
    const { error: errorBefore, listener } = formErrorRef.current;
    if (errorBefore === error) {
      return;
    }

    formErrorRef.current.error = error;
    listener?.(error);
  }, []);

  const setFormErrorListener = useCallback((listener: FormErrorListener) => {
    formErrorRef.current.listener = listener;
  }, []);

  const setValuesChangeListener = useCallback(
    (listener?: FormValueChangeListener<FormDataT>) => {
      valuesChangeListenerRef.current = listener;
    },
    [],
  );

  const clearErrors = useCallback(() => {
    setFormError(undefined);
    for (const field in fieldErrorsRef.current) {
      setFieldError(field, undefined);
    }
  }, [setFormError, setFieldError]);

  const setFieldValue = useCallback(
    <K extends FormFieldNameT>(
      name: K,
      value: FormDataT[K],
      {
        silent = false,
      }: {
        silent?: boolean;
      } = {},
    ) => {
      const registered = registeredElementsRef.current[name];

      if (registered) {
        setControlElementValue(registered, value);
        if (!silent) {
          registered.dispatchEvent(new Event('input', { bubbles: true }));
        }
      } else {
        unattachedValuesRef.current[name] = value;
      }
    },
    [],
  );

  const setInitialValues = useCallback(
    (
      data: Partial<FormDataT>,
      {
        force = false,
        silent = true,
      }: {
        force?: boolean;
        silent?: boolean;
      } = {},
    ) => {
      if (!force && initializedRef.current) {
        return;
      }

      initializedRef.current = true;
      for (const field in data) {
        if (data[field] === undefined) {
          continue;
        }
        setFieldValue(field, data[field], { silent });
      }
    },
    [setFieldValue],
  );

  const validate = useCallback(
    (options: FormFieldsCollectionOptions<FormFieldNameT> = {}): boolean => {
      let isTrue = true;
      const values = getValues(options);

      for (const name in values) {
        const error = registeredOptionsRef.current[name]?.validator?.(values);
        if (!error) {
          continue;
        }
        setFieldError(name, error);
        isTrue = false;
      }

      return isTrue;
    },
    [getValues, setFieldError],
  );

  const register = useCallback(
    <K extends FormFieldNameT>(
      fieldName: K,
      options: FormFieldRegisterOptions<FormDataT> = {},
    ): FormFieldController<FormDataT, K, FormDataT[K]> => {
      registeredOptionsRef.current[fieldName] = options;

      return {
        name: fieldName,
        ref: (element: FormControlElement | null) => {
          if (!element) {
            return;
          }

          // NOTE:
          // We might consider to use `addEventListener('input')` later,
          // currently we do not support binding custom input listener.
          element.oninput = () => {
            const valuesBefore = prevousValuesRef.current;
            const newValues = getValues({ allFields: true });

            if (
              isFormFieldValueChanged(
                valuesBefore[fieldName],
                newValues[fieldName],
              )
            ) {
              dirtyFieldsRef.current.add(fieldName);
              setFieldError(fieldName, undefined);
              setFormError(undefined);
              const extra = {
                field: fieldName,
                valuesBefore,
              };

              options?.onValueChange?.(newValues, extra);

              // No need to check the change of entire form data.
              valuesChangeListenerRef.current?.(newValues, extra);
              prevousValuesRef.current = newValues;
            }
          };

          registeredElementsRef.current[fieldName] = element;

          const unattachedValue = unattachedValuesRef.current[fieldName];

          if (unattachedValue !== undefined) {
            setFieldValue(fieldName, unattachedValue);
            unattachedValuesRef.current[fieldName] = undefined;
          }

          return () => {
            // In <StrictMode>, elements may be mounted/unmounted twice in
            // development.
            // Without this guard, onChange could be triggered even though the
            // value did not change.
            if (dirtyFieldsRef.current.has(fieldName)) {
              unattachedValuesRef.current[fieldName] = getControlElementValue(
                element,
              ) as FormDataT[K];
            }
            registeredElementsRef.current[fieldName] = null;
          };
        },

        setValue: (value: FormDataT[K]) => {
          setFieldValue(fieldName, value);
        },

        setErrorListener: (listener?: FormErrorListener) => {
          fieldErrorListenersRef.current[fieldName] = listener;
        },
      };
    },
    [setFieldValue, setFieldError, setFormError, getValues],
  );

  return {
    getValues,
    register,
    setFieldValue,
    setInitialValues,
    setFieldError,
    setFormError,
    setFormErrorListener,
    setValuesChangeListener,
    clearErrors,
    validate,
  };
}

type UseFormReturn<T extends FormDataBase<T>> = ReturnType<typeof useForm<T>>;

export type FormFieldRegister<T extends FormDataBase<T> = DefaultFormData> =
  UseFormReturn<T>['register'];

export type FormSetFieldValue<T extends FormDataBase<T> = DefaultFormData> =
  UseFormReturn<T>['setFieldValue'];

export type FormSetInitialValues<T extends FormDataBase<T> = DefaultFormData> =
  UseFormReturn<T>['setInitialValues'];

export type FormSetValuesChangeListener<
  T extends FormDataBase<T> = DefaultFormData,
> = UseFormReturn<T>['setValuesChangeListener'];

// DEV NOTE:
// - Design principle: uncontrolled inputs + DOM as source of truth.
// - The returned functions must be stable, wrap it with `useCallback` if not.
// - radio inputs are not supported. Use distinct field names for each radio input
//   instead.
// - We do not support initial value(have tried in the old design, added great
//   complexity, maybe we can add this support in this version)
