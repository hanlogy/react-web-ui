import { FlexCenter } from '../centers';
import { clsx } from '../../helpers/clsx';
import type { CheckboxInputProps } from './types';

export function CheckboxInput({
  className,
  isRadio = false,
  icon,
  label,
  ...rest
}: CheckboxInputProps) {
  return (
    <label className="inline-flex">
      <FlexCenter className="h-6 w-6 shrink-0">
        <input
          type={isRadio ? 'radio' : 'checkbox'}
          className={clsx('mr-2', {
            'peer sr-only': !!icon,
          })}
          {...rest}
        />
        {icon}
      </FlexCenter>
      <div className={className}>{label}</div>
    </label>
  );
}
