// Elements that form controller supports attaching a ref to.
export type FormControlElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

// This default type is very useful when a form is distributed in different
// files.
export type DefaultFormData = Record<string, FormFieldValue>;
export type KeyOfFormData<T extends object> = Extract<keyof T, string>;
export type FormFieldValue = string | boolean;

export type FormDataBase<FormDataT> = {
  [K in keyof FormDataT]: FormFieldValue | undefined;
};

export type FormValueChangeListener<
  FormDataT extends FormDataBase<FormDataT> = DefaultFormData,
> = <K extends KeyOfFormData<FormDataT>>(
  current: Partial<FormDataT>,
  extra: {
    field: K;
    valuesBefore: Partial<FormDataT>;
  },
) => void;

export type FormFieldsCollectionOptions<T extends string> =
  | { allFields: true; fields?: never }
  | { allFields?: false; fields?: T[] };

export type FormFieldValidator<T> = (
  values: Partial<T>,
) => string | undefined | void;

export type FormFieldRegisterOptions<
  FormDataT extends FormDataBase<FormDataT>,
> = Readonly<{
  validator?: FormFieldValidator<FormDataT>;
  onValueChange?: FormValueChangeListener<FormDataT>;
}>;

// We must have all the three generic types, in order to build up the inference
// when `register`.
export interface FormFieldController<
  FormDataT extends FormDataBase<FormDataT>,
  FormFieldNameT extends KeyOfFormData<FormDataT> = KeyOfFormData<FormDataT>,
  FormFieldValueT extends FormDataT[FormFieldNameT] = FormDataT[FormFieldNameT],
> {
  name: FormFieldNameT;
  ref: (element: FormControlElement | null) => void;
  setValue: (value: FormFieldValueT) => void;
  setErrorListener: (listener: FormErrorListener) => void;
}

// Used by both field error listeners and the listener that observe errors not
// associated with any specific field.
export type FormErrorListener = (error?: string) => void;

export type FieldStateClassBuilder =
  | string
  | ((opts: { isError: boolean }) => string);

export interface FormElementsClassNameBuilders {
  inputClass?: FieldStateClassBuilder;
  labelClass?: FieldStateClassBuilder;
  helperClass?: FieldStateClassBuilder;
  errorClass?: FieldStateClassBuilder;
}

export type InputPropsForForm<T> = Omit<
  T,
  | 'name'
  | 'onChange'
  | 'onInput'
  | 'ref'
  | 'className'
  | 'defaultChecked'
  | 'defaultValue'
  | 'value'
>;
