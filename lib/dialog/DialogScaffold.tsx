import type { PropsWithChildren, ReactNode } from 'react';
import { clsx } from '../helpers/clsx';

export function DialogScaffold({
  children,
  className,
  topbar,
  bottomBar,
}: PropsWithChildren<{
  topbar?: ReactNode;
  className?: string;
  bottomBar?: ReactNode;
}>) {
  return (
    <div
      className={clsx(
        'flex max-h-full w-full flex-col overflow-hidden py-6',
        className,
      )}
    >
      {topbar}
      <div className={clsx('flex-1 overflow-auto')}>{children}</div>
      {bottomBar}
    </div>
  );
}
