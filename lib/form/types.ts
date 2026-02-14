// Elements that form controller supports attaching a ref to.
export type FormControlElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

// This default type is very useful when a form registration is distributed in
// different components.
export type DefaultFormData = Record<string, FormFieldValue | undefined>;
export type KeyOfFormData<T extends object> = Extract<keyof T, string>;
export type FormFieldValue = string | boolean;

export type FormDataConstraint<FormDataT extends object> = {
  [K in keyof FormDataT]: FormFieldValue | undefined;
};

export type FormValueChangeListener<
  FormDataT extends FormDataConstraint<FormDataT> = DefaultFormData,
> = (
  current: Partial<FormDataT>,
  extra: {
    // NOTE: Do not narrow to a specific key:
    // <K extends KeyOfFormData<FormDataT>>
    // It does not add any benefit in practice, it might make `useForm` less
    // flexible?
    field: KeyOfFormData<FormDataT>;
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
  FormDataT extends FormDataConstraint<FormDataT>,
> = Readonly<{
  validator?: FormFieldValidator<FormDataT>;
  onValueChange?: FormValueChangeListener<FormDataT>;
}>;

// We must have all the three generic types, in order to build up the inference
// when `register`.
export interface FormFieldController<
  FormDataT extends FormDataConstraint<FormDataT>,
  FormFieldNameT extends KeyOfFormData<FormDataT> = KeyOfFormData<FormDataT>,
  FormFieldValueT extends FormDataT[FormFieldNameT] = FormDataT[FormFieldNameT],
> {
  name: FormFieldNameT;
  ref: (element: FormControlElement | null) => void | (() => void);
  setValue: (value: FormFieldValueT) => void;
  setErrorListener: (listener?: FormErrorListener) => void;
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
  // Do not exclude defaultValue and defaultChecked, we need to support form
  // reset.
  'name' | 'onChange' | 'onInput' | 'ref' | 'className' | 'value' | 'checked'
>;
