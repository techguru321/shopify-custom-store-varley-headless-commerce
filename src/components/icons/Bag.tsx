import {HTMLAttributes} from 'react';

export function BagIcon(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="6" cy="10" r="1" fill="black" />
      <circle cx="12" cy="10" r="1" fill="black" />
      <path
        d="M6 10V4C6 2.34315 7.34315 1 9 1C10.6569 1 12 2.34315 12 4V10"
        stroke="black"
      />
      <path
        d="M2.27715 8.81395C2.37098 8.0633 3.00908 7.5 3.76556 7.5H14.2344C14.9909 7.5 15.629 8.0633 15.7229 8.81395L17.2229 20.8139C17.3348 21.7092 16.6367 22.5 15.7344 22.5H2.26556C1.36332 22.5 0.665238 21.7092 0.777148 20.8139L2.27715 8.81395Z"
        stroke="black"
      />
    </svg>
  );
}
