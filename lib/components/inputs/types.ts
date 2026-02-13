import type { ComponentPropsWithRef, ReactNode } from 'react';

export type TextInputProps = Omit<ComponentPropsWithRef<'input'>, 'prefix'> & {
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export type TextareaInputProps = ComponentPropsWithRef<'textarea'>;

export type CheckboxInputProps = Omit<
  ComponentPropsWithRef<'input'>,
  'type'
> & {
  icon?: ReactNode;
  isRadio?: boolean;
  label?: string;
};

export type SelectInputProps = Omit<
  ComponentPropsWithRef<'select'>,
  'children' | 'multiple'
> & {
  icon?: ReactNode | undefined;
  options: readonly Readonly<{ value: string; label: string }>[];
};
