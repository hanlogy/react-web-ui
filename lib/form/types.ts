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
> = <K extends KeyOfFormData<FormDataT>>(
  current: Partial<FormDataT>,
  extra: {
    // NOTE: We must make field type specific with generic K, see (1)
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
  FormDataT extends FormDataConstraint<FormDataT>,
> = Readonly<{
  validator?: FormFieldValidator<FormDataT>;
  onValueChange?: FormValueChangeListener<FormDataT>;
}>;

// We must have all the three generic types, in order to build up the inference
// when `register`. see (1).
// FormFieldValueT is redundant by default until FormFieldNameT is specific.
export interface FormFieldController<
  FormDataT extends FormDataConstraint<FormDataT>,
  FormFieldNameT extends KeyOfFormData<FormDataT> = KeyOfFormData<FormDataT>,
  FormFieldValueT extends FormDataT[FormFieldNameT] = FormDataT[FormFieldNameT],
> {
  name: FormFieldNameT;
  ref: (element: FormControlElement | null) => void | (() => void);
  reset: () => void;
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

// (1)
// When try to use wider type for field or remove the redundant generic value
// type, check this:
// Component A
// const { register } = useForm<{
//   name: string;
//   description: string;
// }>();
// <ChildForm register={register} />
//
// Component B
// export function ChildForm({
//   register,
// }: {
//   register: FormFieldRegister<{
//     description: string;
//   }>;
// }) {
//   register('description');
//   return null;
// }
