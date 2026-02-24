import { type ReactNode } from 'react';

export type CloseDialogFn<T = unknown> = (value?: T) => void;

export type DialogContentBuilder<T> = ({
  closeDialog,
}: {
  readonly closeDialog: CloseDialogFn<T>;
}) => ReactNode;

export type DiaglogReturnType<T> = Promise<T | undefined>;

export interface DialogContextValue {
  readonly openDialog: <T>(
    contentBuilder: DialogContentBuilder<T>,
    options?: OpenDialogOptions,
  ) => DiaglogReturnType<T>;
}

export type OpenDialogOptions = {
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
};
