import { clsx } from '../helpers/clsx';
import type { ReactElement, SVGProps } from 'react';
import { hasHeightClass, hasWidthClass } from './inputs/helpers';

type SvgIconChild = ReactElement | null | false;
type SvgIconChildren = SvgIconChild | readonly SvgIconChild[];

type SvgIconProps = {
  viewBox: string;
  children: SvgIconChildren;
} & Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'>;

export function SvgIcon({
  className,
  viewBox,
  children,
  ...rest
}: SvgIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="currentColor"
      className={clsx(
        {
          'w-full': !hasWidthClass(className),
          'h-full': !hasHeightClass(className),
        },
        className,
      )}
      {...rest}
    >
      {children}
    </svg>
  );
}
