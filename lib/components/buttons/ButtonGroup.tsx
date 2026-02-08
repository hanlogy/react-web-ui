import { Fragment, type ReactNode } from 'react';
import { clsx } from '../../helpers/clsx';

type ButtonValue = string | number | boolean;

type ButtonItemBase<V extends ButtonValue = ButtonValue> = { value: V };

export type ButtonBuilder<ItemT extends ButtonItemBase> = (args: {
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  item: ItemT;
}) => ReactNode;

export function ButtonGroup<ItemT extends ButtonItemBase>({
  className,
  buttonBuilder,
  items,
  value,
}: {
  className?: string;
  buttonBuilder: ButtonBuilder<ItemT>;
  items: readonly ItemT[];
  value: ItemT['value'];
}) {
  return (
    <div className={clsx('grid auto-cols-fr grid-flow-col', className)}>
      {items.map((item, index) => {
        return (
          <Fragment key={String(item.value)}>
            {buttonBuilder({
              item,
              isSelected: value === item.value,
              isFirst: index === 0,
              isLast: index + 1 === items.length,
            })}
          </Fragment>
        );
      })}
    </div>
  );
}
