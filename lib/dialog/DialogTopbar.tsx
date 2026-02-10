import type { PropsWithChildren } from 'react';
import { clsx } from '../helpers/clsx';

export function DialogTopbar({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('px-6 mb-6', className)}>{children}</div>;
}
