import { useCallback } from 'react';
export type FormControlElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
export type FormErrorListener = (error?: string) => void;

export type FormFieldValue = string | boolean;
export type DefaultFormData = Record<string, FormFieldValue | undefined>;
export type KeyOfFormData<T extends object> = Extract<keyof T, string>;
export type FormDataConstraint<FormDataT> = {
  [K in keyof FormDataT]: FormFieldValue | undefined;
};
export type FormFieldValidator<T> = (
  values: Partial<T>,
) => string | undefined | void;
export type FormFieldRegisterOptions<
  FormDataT extends FormDataConstraint<FormDataT>,
> = Readonly<{
  validator?: FormFieldValidator<FormDataT>;
  onValueChange?: FormValueChangeListener<FormDataT>;
}>;
export type FormValueChangeListener<
  FormDataT extends FormDataConstraint<FormDataT> = DefaultFormData,
> = <K extends KeyOfFormData<FormDataT>>(
  current: Partial<FormDataT>,
  extra: {
    field: K;
    valuesBefore: Partial<FormDataT>;
  },
) => void;

export interface FormFieldController<
  FormDataT extends FormDataConstraint<FormDataT>,
  FormFieldNameT extends KeyOfFormData<FormDataT> = KeyOfFormData<FormDataT>,
  FormFieldValueT extends FormDataT[FormFieldNameT] = FormDataT[FormFieldNameT],
> {
  name: FormFieldNameT;
  ref: (element: FormControlElement | null) => void;
  setValue: (value: FormFieldValueT) => void;
  setErrorListener: (listener: FormErrorListener) => void;
}

//

export function useForm<
  FormDataT extends FormDataConstraint<FormDataT> = DefaultFormData,
>() {
  type FormFieldNameT = KeyOfFormData<FormDataT>;
  const register = useCallback(
    <K extends FormFieldNameT>(
      fieldName: K,
      options: FormFieldRegisterOptions<FormDataT> = {},
    ): FormFieldController<FormDataT, K, FormDataT[K]> => {
      console.log(options, fieldName);
      return null as unknown as FormFieldController<FormDataT, K, FormDataT[K]>;
    },
    [],
  );

  const setValuesChangeListener = useCallback(
    (listener?: FormValueChangeListener<FormDataT>) => {
      console.log(listener);
    },
    [],
  );

  return {
    register,
    setValuesChangeListener,
  };
}

export type FormManager<T extends FormDataConstraint<T> = DefaultFormData> =
  ReturnType<typeof useForm<T>>;
