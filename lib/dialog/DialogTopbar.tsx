import type { PropsWithChildren } from 'react';
import { clsx } from '../helpers/clsx';

export function DialogTopbar({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('px-6 pb-4', className)}>{children}</div>;
}
