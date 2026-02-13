import { clsx } from '../../helpers/clsx';
import { FlexCenter } from '../centers';
import { hasRingClass } from './helpers';
import { SvgIcon } from '../SvgIcon';
import type { SelectInputProps } from './types';

/**
 * Support only single select.
 */
export function SelectInput({
  className,
  icon,
  options,
  defaultValue,
  ...rest
}: SelectInputProps) {
  const resolvedDefaultValue = options.some(
    (e) => e.value === String(defaultValue),
  )
    ? String(defaultValue)
    : options.length > 0
      ? options[0].value
      : '';

  return (
    <div className="relative">
      <select
        className={clsx('h-14 w-full px-3 appearance-none', className, {
          'outline-none': hasRingClass(className),
        })}
        defaultValue={resolvedDefaultValue}
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
