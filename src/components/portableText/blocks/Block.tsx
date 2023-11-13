// @ts-expect-error incompatibility with node16 resolution
import type {PortableTextBlock} from '@portabletext/types';
import clsx from 'clsx';
import {ReactNode} from 'react';

type Props = {
  className: string;
  children?: ReactNode;
  node: PortableTextBlock;
};

export default function Block({className, children, node}: Props) {
  if (node.style === 'blockquote') {
    return (
      <blockquote
        className={clsx(
          'first:mt-0 last:mb-0', //
          ' text-[48px]',
          className ? className : '',
        )}
      >
        {children}
      </blockquote>
    );
  }
  if (node.style === 'h1') {
    return (
      <h1
        className={clsx(
          'first:mt-0 last:mb-0', //
          'mt-16  mb-5  text-3xl  md:text-5xl',
          className ? className : '',
        )}
      >
        {children}
      </h1>
    );
  }
  if (node.style === 'h2') {
    return (
      <h2
        className={clsx(
          'first:mt-0 last:mb-0', //
          'mt-16  mb-5  text-3xl',
          className ? className : '',
        )}
      >
        {children}
      </h2>
    );
  }
  if (node.style === 'h3') {
    return (
      <h3
        className={clsx(
          'first:mt-0 last:mb-0', //
          'mt-16 mb-5 text-2xl',
          className ? className : '',
        )}
      >
        {children}
      </h3>
    );
  }
  if (node.style === 'h4') {
    return (
      <h4
        className={clsx(
          'first:mt-0 last:mb-0', //
          'mt-16  mb-5  text-md md:text-xl',
          className ? className : '',
        )}
      >
        {children}
      </h4>
    );
  }
  if (node.style === 'h5') {
    return (
      <h5
        className={clsx(
          'first:mt-0 last:mb-0', //
          'mt-16  mb-5  text-lg',
          className ? className : '',
        )}
      >
        {children}
      </h5>
    );
  }

  if (node.style === 'h6') {
    return (
      <h6
        className={clsx(
          'first:mt-0 last:mb-0', //
          'mt-16  mb-5  text-md',
          className ? className : '',
        )}
      >
        {children}
      </h6>
    );
  }

  // Pragraphs
  return (
    <p
      className={clsx(
        'first:mt-0 last:mb-0', //
        'relative mb-4 leading-paragraph',
        className ? className : '',
      )}
    >
      {children}
    </p>
  );
}
