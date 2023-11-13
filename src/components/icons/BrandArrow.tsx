import {HTMLAttributes} from 'react';

export default function BrandArrowIcon(props: HTMLAttributes<SVGElement>) {
  const {strokeColor, ...rest} = props;

  return (
    <svg
      className="icon icon-chevron-down"
      width="17"
      height="11"
      viewBox="0 0 17 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        className="icon-chevron-down__path"
        d="M15.5 1.5L8.5 8.5L1.5 1.5"
        stroke={strokeColor || '#000'}
        strokeWidth="1"
      ></path>
    </svg>
  );
}
