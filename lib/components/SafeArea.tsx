import type { PropsWithChildren } from 'react';
import { clsx } from '../helpers/clsx';

export function SafeArea({
  top = true,
  left = true,
  bottom = true,
  right = true,
  children,
  className,
}: PropsWithChildren<{
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
  className?: string;
}> = {}) {
  const safeClassName = filterOutSpacingClassNames(className);

  return (
    <div
      className={clsx(safeClassName, {
        'pl-[env(safe-area-inset-left)]': left === true,
        'pt-[env(safe-area-inset-top)]': top === true,
        'pr-[env(safe-area-inset-right)]': right === true,
        'pb-[env(safe-area-inset-bottom)]': bottom === true,
      })}
    >
      {children}
    </div>
  );
}

function filterOutSpacingClassNames(className?: string): string | undefined {
  if (!className) {
    return undefined;
  }

  const spacingRegex = /^-?(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)-/;

  const kept = className
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !spacingRegex.test(token));

  return kept.length ? kept.join(' ') : undefined;
}
