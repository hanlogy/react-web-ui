import type { ComponentProps } from 'react';
import { clsx } from '../../helpers/clsx';
import { hasRingClass } from './helpers';

export function MultilineTextInput({
  className,
  ...rest
}: ComponentProps<'textarea'>) {
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
