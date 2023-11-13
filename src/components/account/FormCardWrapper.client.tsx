import {ReactNode} from 'react';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function FormCardWrapper({children, title}: Props) {
  return (
    <div className="w-full max-w-lg px-6">
      <h1 className="mb-20 text-center text-3xl font-nhaasMd">{title}</h1>
      {children}
    </div>
  );
}
