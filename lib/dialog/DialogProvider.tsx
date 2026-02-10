'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import { DialogContext } from './DialogContext';
import type { DiaglogReturnType, DialogContentBuilder } from './types';
import { DialogBackdrop } from './DialogBackdrop';

export function DialogProvider({ children }: PropsWithChildren) {
  const [dialog, setDialog] = useState<ReactNode | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const resolverRef = useRef<((value: unknown) => void) | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(!!dialog);
    }, 10);

    return () => {
      clearTimeout(timer);
    };
  }, [dialog]);

  const closeDialog = useCallback(<T,>(value: T | undefined = undefined) => {
    setDialog(null);
    resolverRef.current?.(value);
  }, []);

  const openDialog = useCallback(
    async <T,>(
      contentBuilder: DialogContentBuilder<T>,
    ): DiaglogReturnType<T> => {
      setDialog(contentBuilder({ closeDialog }));

      return new Promise<T | undefined>((r) => {
        resolverRef.current = r as unknown as (value: unknown) => void;
      });
    },
    [closeDialog],
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDialog();
      }
    };

    if (dialog) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dialog, closeDialog]);

  return (
    <DialogContext value={{ openDialog }}>
      {children}
      {dialog && (
        <DialogBackdrop showOverlay={showOverlay} onClick={() => closeDialog()}>
          <div onClick={(e) => e.stopPropagation()} className="contents">
            {dialog}
          </div>
        </DialogBackdrop>
      )}
    </DialogContext>
  );
}
