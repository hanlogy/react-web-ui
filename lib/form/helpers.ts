import type { FieldStateClassBuilder, FormFieldValue } from './types';

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

/**
 * A type-safe version of Object.keys
 */
// TODO: Move to ts-lib
export function getKeys<T extends object>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>;
}
