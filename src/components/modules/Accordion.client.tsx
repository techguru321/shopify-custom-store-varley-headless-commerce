// @ts-expect-error incompatibility with node16 resolution
import {Disclosure} from '@headlessui/react';
// @ts-expect-error incompatibility with node16 resolution
import type {PortableTextBlock} from '@portabletext/types';
import clsx from 'clsx';
import type {SanityModuleAccordion} from '../../types';
import BrandArrowIcon from '../icons/BrandArrow';
import PortableText from '../portableText/PortableText.client';

type Props = {
  node: PortableTextBlock & SanityModuleAccordion;
};

export default function AccordionBlock({module}: Props) {
  return (
    <div
      className={clsx(
        'border-brandClay first:mt-0 first:border-t last:mb-0', //
        'my-8',
      )}
    >
      {module?.groups?.map((group) => (
        <Disclosure key={group._key}>
          {({open}: {open: boolean}) => (
            <div className="flex flex-col border-b border-brandClay">
              <Disclosure.Button
                className={clsx(
                  'flex items-center justify-between py-4 font-nhaasReg  text-md',
                  '',
                )}
              >
                <div className="truncate">{group.title}</div>
                <div className="ml-4 shrink-0">
                  {!open ? (
                    <BrandArrowIcon className="rotate-180 transition  duration-300  ease-in-out" />
                  ) : (
                    <BrandArrowIcon className="transition  duration-300  ease-in-out" />
                  )}
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pb-4 font-nhaasReg text-md">
                <PortableText blocks={group.body} />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
