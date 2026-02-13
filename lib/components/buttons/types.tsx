import type { ComponentPropsWithRef, ReactNode } from 'react';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonType = ButtonProps['type'];

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  readonly removeSpace?: boolean;
  readonly size?: ButtonSize;
  readonly isRounded?: boolean;
  readonly isInline?: boolean;
  readonly isCenter?: boolean;
  readonly icon?: ReactNode;
};

export type IconButtonWidth = 'narrow' | 'regular' | 'wide';

export type IconButtonProps = Omit<
  ButtonProps,
  'removeSpace' | 'isCenter' | 'icon'
> & {
  readonly width?: IconButtonWidth;
};
