'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { clsx } from '../helpers/clsx';

export type DropdownAlignment = 'bottomLeft' | 'bottomRight';

export type DropdownButtonBuilder = (opts: {
  show: () => void;
  isShown: boolean;
}) => ReactNode;

export interface DropdownProps {
  buttonBuilder: DropdownButtonBuilder;
  children: ReactNode | ((close: () => void) => ReactNode);
  alignment?: DropdownAlignment;
}

export function Dropdown({
  buttonBuilder,
  children,
  alignment = 'bottomLeft',
}: DropdownProps) {
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const close = () => setIsShown(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsShown(false);
    };

    if (isShown) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isShown]);

  return (
    <div className="relative inline-block">
      {buttonBuilder({ show, isShown })}

      {isShown && (
        <>
          <div className="fixed inset-0 z-110 opacity-0" onClick={close}></div>
          <div
            className={clsx('absolute z-111 mt-1 w-max min-w-fit', {
              'right-0': alignment === 'bottomRight',
              'left-0': alignment === 'bottomLeft',
            })}
          >
            {typeof children === 'function' ? children(close) : children}
          </div>
        </>
      )}
    </div>
  );
}
