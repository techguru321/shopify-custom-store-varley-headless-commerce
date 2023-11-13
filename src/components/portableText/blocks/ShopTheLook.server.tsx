// @ts-expect-error incompatibility with node16 resolution
import {Disclosure} from '@headlessui/react';
// @ts-expect-error incompatibility with node16 resolution
import type {PortableTextBlock} from '@portabletext/types';
import clsx from 'clsx';
// import type {SanityModuleAccordion} from '../../../types';

// type Props = {
//   node: PortableTextBlock & SanityModuleAccordion;
// };

export default function ShopTheLookBlock({node}) {
  return (
    <div
      className={clsx(
        'border-brandClay first:mt-0  first:border-t  last:mb-0', //
        'my-8',
      )}
    >
      geoff
    </div>
  );
}
