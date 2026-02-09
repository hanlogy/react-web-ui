import type { ComponentProps, ReactNode } from 'react';

import { clsx } from '../../helpers/clsx';
import { FlexCenter } from '../centers';
import { hasRingClass } from './helpers';

export function TextInput({
  className,
  prefix,
  suffix,
  ...rest
}: Omit<ComponentProps<'input'>, 'prefix'> & {
  prefix?: ReactNode;
  suffix?: ReactNode;
}) {
  const iconCommon = 'absolute top-2 h-10 w-10';

  return (
    <div className={clsx({ relative: prefix || suffix })}>
      <input
        className={clsx('h-14 w-full appearance-none', className, {
          'outline-none': hasRingClass(className),
          'pl-3': !prefix,
          'pr-3': !suffix,
          'pl-13': prefix,
          'pr-13': suffix,
        })}
        {...rest}
      />
      {prefix && (
        <FlexCenter className={clsx(iconCommon, 'pointer-events-none left-1')}>
          {prefix}
        </FlexCenter>
      )}
      {suffix && (
        <FlexCenter className={clsx(iconCommon, 'right-1')}>
          {suffix}
        </FlexCenter>
      )}
    </div>
  );
}
