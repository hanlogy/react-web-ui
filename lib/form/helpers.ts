import type { FieldStateClassBuilder } from './types';

export function resolveFieldStateClass(
  builder: FieldStateClassBuilder | undefined = '',
  { isError }: { isError: boolean },
): string {
  return typeof builder === 'function' ? builder({ isError }) : builder;
}
