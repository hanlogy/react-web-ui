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
import type {
  DiaglogReturnType,
  DialogContentBuilder,
  OpenDialogOptions,
} from './types';
import { DialogBackdrop } from './DialogBackdrop';

export function DialogProvider({ children }: PropsWithChildren) {
  const [dialog, setDialog] = useState<ReactNode | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const openDialogOptionsRef = useRef<OpenDialogOptions>({
    closeOnBackdropClick: true,
    closeOnEscape: true,
  });
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
      options: OpenDialogOptions = {},
    ): DiaglogReturnType<T> => {
      openDialogOptionsRef.current = options;
      setDialog(contentBuilder({ closeDialog }));

      return new Promise<T | undefined>((r) => {
        resolverRef.current = r as unknown as (value: unknown) => void;
      });
    },
    [closeDialog],
  );

  useEffect(() => {
    const { closeOnEscape } = openDialogOptionsRef.current;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape !== false) {
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
        <DialogBackdrop
          showOverlay={showOverlay}
          onClick={() => {
            if (openDialogOptionsRef.current.closeOnBackdropClick !== false) {
              closeDialog();
            }
          }}
        >
          <div onClick={(e) => e.stopPropagation()} className="contents">
            {dialog}
          </div>
        </DialogBackdrop>
      )}
    </DialogContext>
  );
}
