import type { MouseEventHandler, PropsWithChildren } from 'react';
import { clsx } from '../helpers/clsx';

export function DialogBackdrop({
  children,
  showOverlay = true,
  ...rest
}: PropsWithChildren<{
  showOverlay?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}>) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className={clsx(
        'fixed inset-0 z-120 flex items-center justify-center transition-colors duration-200 ease-out',
        'pl-[calc(env(safe-area-inset-left)+1rem)]',
        'pt-[calc(env(safe-area-inset-top)+1rem)]',
        'pr-[calc(env(safe-area-inset-right)+1rem)]',
        'pb-[calc(env(safe-area-inset-bottom)+1rem)]',
        showOverlay ? 'bg-black/60' : 'bg-black/0',
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
