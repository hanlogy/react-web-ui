import { useCallback, useLayoutEffect, useRef } from 'react';
import type {
  DefaultFormData,
  FormControlElement,
  FormDataConstraint,
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
import { getKeys, isFormFieldValueChanged } from './helpers';

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
  FormDataT extends FormDataConstraint<FormDataT> = DefaultFormData,
>({
  initialValues,
  alwaysApplyInitialValues = false,
  emitInitialValuesChange = false,
}: {
  initialValues?: Partial<FormDataT>;
  alwaysApplyInitialValues?: boolean;
  emitInitialValuesChange?: boolean;
} = {}) {
  type FieldName = KeyOfFormData<FormDataT>;
  type FieldRecord<V> = Partial<Record<FieldName, V>>;

  const initializedRef = useRef<boolean>(false);

  // null when unmounted
  const registeredElementsRef = useRef<
    Partial<FieldRecord<FormControlElement | null>>
  >({});

  const registeredOptionsRef = useRef<
    Partial<FieldRecord<FormFieldRegisterOptions<FormDataT>>>
  >({});

  // Fields have ever set a valid value.
  const everSetFieldsRef = useRef<Set<FieldName>>(new Set());

  const unattachedValuesRef = useRef<Partial<FormDataT>>({});

  // Only for onValueChange
  const valuesSnapshotRef = useRef<Partial<FormDataT>>({});

  const fieldErrorsRef = useRef<Partial<FieldRecord<string | undefined>>>({});

  const fieldErrorListenersRef = useRef<
    Partial<FieldRecord<FormErrorListener | undefined>>
  >({});

  const formErrorRef = useRef<{ listener?: FormErrorListener; error?: string }>(
    {},
  );

  const valuesChangeListenerRef = useRef<
    FormValueChangeListener<FormDataT> | undefined
  >(undefined);

  // Only returns the values of the mounted elements when allFields is false.
  const getValues = useCallback(
    (
      options: FormFieldsCollectionOptions<FieldName> = {},
    ): Partial<FormDataT> => {
      return collectValues(
        registeredElementsRef.current,
        unattachedValuesRef.current,
        options,
      );
    },
    [],
  );

  const setFieldError = useCallback((field: FieldName, error?: string) => {
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
    for (const field of getKeys(fieldErrorsRef.current)) {
      setFieldError(field, undefined);
    }
  }, [setFormError, setFieldError]);

  const setFieldValue = useCallback(
    <K extends FieldName>(
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
        } else {
          const prevousValue = valuesSnapshotRef.current[name];
          if (isFormFieldValueChanged(prevousValue, value)) {
            valuesSnapshotRef.current = getValues({ allFields: true });
            everSetFieldsRef.current.add(name);
          }
        }
      } else {
        unattachedValuesRef.current[name] = value;
      }
    },
    [getValues],
  );

  // TODO: setInitialValues calls setFieldValue per field. If `silent` is false,
  // this will dispatch multiple input/change events and trigger the form-level
  // value change listener multiple times.
  // Ideally, keep per-field listeners as is, but batch the form-level listener
  // to fire once after all fields are applied.
  // (Not urgent: initial values are normally applied with `silent: true`.)
  const setInitialValues = useCallback(
    (
      data: Partial<FormDataT>,
      { force, silent }: { force?: boolean; silent?: boolean } = {},
    ) => {
      const solvedForce = force ?? alwaysApplyInitialValues === true;
      const solvedSilent = silent ?? emitInitialValuesChange !== true;

      if (!solvedForce && initializedRef.current) {
        return;
      }

      initializedRef.current = true;
      for (const field in data) {
        if (data[field] === undefined) {
          continue;
        }
        setFieldValue(field, data[field], { silent: solvedSilent });
      }
    },
    [setFieldValue, alwaysApplyInitialValues, emitInitialValuesChange],
  );

  const validate = useCallback(
    (options: FormFieldsCollectionOptions<FieldName> = {}): boolean => {
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
    <K extends FieldName>(
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
            const valuesBefore = valuesSnapshotRef.current;
            const newValues = getValues({ allFields: true });

            if (
              isFormFieldValueChanged(
                valuesBefore[fieldName],
                newValues[fieldName],
              )
            ) {
              everSetFieldsRef.current.add(fieldName);
              setFieldError(fieldName, undefined);
              setFormError(undefined);
              const extra = {
                field: fieldName,
                valuesBefore,
              };

              options?.onValueChange?.(newValues, extra);

              // No need to check the change of entire form data.
              valuesChangeListenerRef.current?.(newValues, extra);
              valuesSnapshotRef.current = newValues;
            }
          };

          registeredElementsRef.current[fieldName] = element;

          const unattachedValue = unattachedValuesRef.current[fieldName];

          if (unattachedValue !== undefined) {
            setFieldValue(fieldName, unattachedValue, { silent: true });
            unattachedValuesRef.current[fieldName] = undefined;
          }

          return () => {
            // In <StrictMode>, elements may be mounted/unmounted twice in
            // development.
            // Without this guard, onChange could be triggered even though the
            // value did not change.
            if (everSetFieldsRef.current.has(fieldName)) {
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

  useLayoutEffect(() => {
    if (initialValues) {
      setInitialValues(initialValues);
    }
  }, [initialValues, setInitialValues]);

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

export type FormManager<T extends FormDataConstraint<T> = DefaultFormData> =
  ReturnType<typeof useForm<T>>;

export type FormFieldRegister<
  T extends FormDataConstraint<T> = DefaultFormData,
> = FormManager<T>['register'];

export type FormSetFieldValue<
  T extends FormDataConstraint<T> = DefaultFormData,
> = FormManager<T>['setFieldValue'];

export type FormSetInitialValues<
  T extends FormDataConstraint<T> = DefaultFormData,
> = FormManager<T>['setInitialValues'];

export type FormSetValuesChangeListener<
  T extends FormDataConstraint<T> = DefaultFormData,
> = FormManager<T>['setValuesChangeListener'];

// DEV NOTE:
// - Design principle: uncontrolled inputs + DOM as source of truth.
// - The returned functions must be stable, wrap it with `useCallback` if not.
// - radio inputs are not supported. Use distinct field names for each radio input
//   instead.
