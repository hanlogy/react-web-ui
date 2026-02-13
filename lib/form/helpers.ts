import type {
  DefaultFormData,
  FieldStateClassBuilder,
  FormDataBase,
  FormFieldValue,
  KeyOfFormData,
} from './types';

export function resolveFieldStateClass(
  builder: FieldStateClassBuilder | undefined = '',
  { isError }: { isError: boolean },
): string {
  return typeof builder === 'function' ? builder({ isError }) : builder;
}

export function isFormFieldValueChanged(
  A: FormFieldValue | undefined,
  B: FormFieldValue | undefined,
) {
  if (typeof A === 'string' || typeof B === 'string') {
    A ??= '';
    B ??= '';

    return A !== B;
  }

  return !!A !== !!B;
}

function getFormDataKeys<FormDataT extends object>(
  values: FormDataT,
): KeyOfFormData<FormDataT>[] {
  return Object.keys(values) as KeyOfFormData<FormDataT>[];
}

export function isFormValuesChanged<
  FormDataT extends FormDataBase<FormDataT> = DefaultFormData,
>(A: FormDataT, B: FormDataT): boolean {
  const allKeys = new Set<KeyOfFormData<FormDataT>>();

  for (const key of getFormDataKeys(A)) {
    allKeys.add(key);
  }

  for (const key of getFormDataKeys(B)) {
    allKeys.add(key);
  }

  for (const key of allKeys) {
    const valueA = A[key];
    const valueB = B[key];

    if (isFormFieldValueChanged(valueA, valueB)) {
      return true;
    }
  }

  return false;
}
