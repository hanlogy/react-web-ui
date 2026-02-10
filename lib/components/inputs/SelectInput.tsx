import { clsx } from '../../helpers/clsx';
import { FlexCenter } from '../centers';
import { hasRingClass } from './helpers';
import { SvgIcon } from '../SvgIcon';
import type { SelectInputProps } from './types';

export function SelectInput({
  className,
  icon,
  options,
  ...rest
}: SelectInputProps) {
  return (
    <div className="relative">
      <select
        className={clsx('h-14 w-full px-3 appearance-none', className, {
          'outline-none': hasRingClass(className),
        })}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <FlexCenter className="absolute top-2 h-10 w-10 right-1 pointer-events-none">
        {icon ?? (
          <SvgIcon viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M7 10l5 5 5-5" />
          </SvgIcon>
        )}
      </FlexCenter>
    </div>
  );
}
