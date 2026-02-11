import type { PropsWithChildren } from 'react';
import { clsx } from '../helpers/clsx';

export function DialogActionBar({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-end gap-2 px-6 mt-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
