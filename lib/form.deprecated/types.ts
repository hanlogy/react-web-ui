export type FormFieldValidator<T> = (
  values: Partial<T>,
) => string | undefined | void;

export type FormInputValueChange<T> = <K extends keyof T>(
  values: Partial<T>,
  extra: {
    readonly field: K;
    readonly valuesBefore: Partial<T>;
  },
) => void;

export type FormFieldRegisterOptions<T> = {
  validator?: FormFieldValidator<T>;
  onValueChange?: FormInputValueChange<T>;
};

export type FormErrorListener = (error?: string) => void;

export interface FormInitializeValuesOptions {
  // If it will dispatch a change event(This event is the html raw event, we
  // we need to use onchange to capture it. Not React onChange)
  readonly emitEvent?: boolean;

  // It will not invoke onValueChange if true.
  readonly silent?: boolean;

  readonly force?: boolean;

  readonly shouldClearErrors?: boolean;
}

export type StringKeyOf<T extends object> = Extract<keyof T, string>;

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
  | 'ref'
  | 'className'
  | 'defaultChecked'
  | 'defaultValue'
  | 'value'
>;
