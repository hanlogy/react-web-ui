import { clsx } from '../../helpers/clsx';
import { hasRingClass } from './helpers';
import type { TextareaInputProps } from './types';

export function TextareaInput({
  className,
  ...rest
}: TextareaInputProps) {
  return (
    <textarea
      className={clsx(
        'w-full p-3 appearance-none',
        {
          'outline-none': hasRingClass(className),
        },
        className,
      )}
      {...rest}
    />
  );
}
