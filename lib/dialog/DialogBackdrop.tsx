import type { MouseEventHandler, PropsWithChildren } from 'react';
import { clsx } from '../helpers/clsx';

export type WithPaddingWhen = 'small' | 'medium' | 'large' | 'all';

export function DialogBackdrop({
  withPaddingWhen = 'all',
  children,
  showOverlay = true,
  ...rest
}: PropsWithChildren<{
  withPaddingWhen?: WithPaddingWhen;

  showOverlay?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}>) {
  const safeArea = findSafeArea(withPaddingWhen);

  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className={clsx(
        'fixed inset-0 z-120 flex items-center justify-center transition-colors duration-200 ease-out',
        safeArea,
        showOverlay ? 'bg-black/60' : 'bg-black/0',
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// NOTE:
// 1. Do not use `${breakpoint}:pl-`, tailwindcss compiler will ignore it.
// 2. We need to handle the safe are in instances when padding is removed.
function findSafeArea(withPaddingWhen: WithPaddingWhen) {
  switch (withPaddingWhen) {
    case 'small':
      return [
        'sm:pl-[calc(env(safe-area-inset-left)+1rem)]',
        'sm:pt-[calc(env(safe-area-inset-top)+1rem)]',
        'sm:pr-[calc(env(safe-area-inset-right)+1rem)]',
        'sm:pb-[calc(env(safe-area-inset-bottom)+1rem)]',
      ];
    case 'medium':
      return [
        'md:pl-[calc(env(safe-area-inset-left)+1rem)]',
        'md:pt-[calc(env(safe-area-inset-top)+1rem)]',
        'md:pr-[calc(env(safe-area-inset-right)+1rem)]',
        'md:pb-[calc(env(safe-area-inset-bottom)+1rem)]',
      ];
    case 'large':
      return [
        'lg:pl-[calc(env(safe-area-inset-left)+1rem)]',
        'lg:pt-[calc(env(safe-area-inset-top)+1rem)]',
        'lg:pr-[calc(env(safe-area-inset-right)+1rem)]',
        'lg:pb-[calc(env(safe-area-inset-bottom)+1rem)]',
      ];
    default:
      return [
        'pl-[calc(env(safe-area-inset-left)+1rem)]',
        'pt-[calc(env(safe-area-inset-top)+1rem)]',
        'pr-[calc(env(safe-area-inset-right)+1rem)]',
        'pb-[calc(env(safe-area-inset-bottom)+1rem)]',
      ];
  }
}
