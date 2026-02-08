'use client';

import type { Key, ReactNode } from 'react';
import { Dropdown, type DropdownProps } from './Dropdown';
import { clsx } from '../helpers/clsx';

export type DropdownMenuItemBuilder<TOption> = (opts: {
  item: TOption;
  close: VoidFunction;
}) => ReactNode;

export type DropdownMenuKeyBuilder<TOption> = (item: TOption) => Key;

type DropdownMenuProps<TOption> = Omit<DropdownProps, 'children'> & {
  options: readonly TOption[];
  itemBuilder: DropdownMenuItemBuilder<TOption>;
  keyBuilder: DropdownMenuKeyBuilder<TOption>;
  className?: string;
};

export function DropdownMenu<TOption>({
  alignment,
  buttonBuilder,
  options,
  itemBuilder,
  keyBuilder,
  className,
}: DropdownMenuProps<TOption>) {
  return (
    <Dropdown alignment={alignment} buttonBuilder={buttonBuilder}>
      {(close) => (
        <div className={clsx('flex flex-col items-start p-1', className)}>
          {options.map((item) => {
            return (
              <div key={keyBuilder(item)}>{itemBuilder({ item, close })}</div>
            );
          })}
        </div>
      )}
    </Dropdown>
  );
}
