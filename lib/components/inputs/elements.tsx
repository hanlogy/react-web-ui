import type { PropsWithChildren } from 'react';
import { clsx } from '../../helpers/clsx';
import type { PropsWithClassName } from '../../types';

// Do not use label tag here for now, otherwise we need to manage the ids.
export const InputLabel = createElement('mb-1 block px-3 font-medium');

export const InputHelper = createElement('mt-1 px-3 text-sm');

export const InputError = createElement('mt-1 px-3 text-sm font-semibold');

function createElement(baseClassName: string) {
  return ({ children, className }: PropsWithChildren & PropsWithClassName) => (
    <div className={clsx(baseClassName, className)}>{children}</div>
  );
}
