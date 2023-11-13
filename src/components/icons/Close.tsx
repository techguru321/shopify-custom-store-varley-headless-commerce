import { HTMLAttributes } from "react";

export default function CloseIcon(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="0.646447" y1="16.6464" x2="16.6464" y2="0.646447" stroke="black" />
      <line x1="0.353553" y1="0.646447" x2="16.3536" y2="16.6464" stroke="black" />
    </svg>

  );
}
