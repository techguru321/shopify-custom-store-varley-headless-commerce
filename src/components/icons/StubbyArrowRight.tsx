import {HTMLAttributes} from 'react';

export function StubbyArrowRightIcon(props: HTMLAttributes<SVGElement>) {
  return (
    <svg 
        className=""
        width="18"
        height="13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path 
            d="M0 6.5h16M11 1l5.5 5.5L11 12"
            stroke="#CFC7C0"
            strokeWidth="2"
        />
    </svg>
  );
}


