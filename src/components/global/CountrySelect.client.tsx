// @ts-expect-error incompatibility with node16 resolution
import {Dialog} from '@headlessui/react';
import {Link} from '@shopify/hydrogen';
import clsx from 'clsx';
import {useState} from 'react';
import sanityConfig from '../../../sanity.config';
import {ChevronDownIcon} from '../icons/ChevronDown';
import CloseIcon from '../icons/Close';
import SanityImage from '../media/SanityImage.client';

/**
 * A client component that selects the appropriate country to display for products on a website
 */

type Props = {
  countries: any[];
  icon?: boolean;
};

export default function CountrySelect({countries, icon}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className={clsx('flex w-full items-center sm:w-auto')}
        onClick={() => setIsOpen(true)}
      >
        &nbsp;<span className="mr-auto lg:mr-2">Europe</span>
        {icon && (
          <ChevronDownIcon className="h-[24px] w-[24px] transition  duration-300  ease-in-out" />
        )}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(true)}
        className="relative z-50"
      >
        <div
          className={clsx([
            'fixed inset-0 flex items-center justify-center p-4',
            isOpen ? 'bg-black/70' : '',
          ])}
        >
          <Dialog.Panel className="max-w-sm bg-white">
            <Dialog.Title className="relative">
              <h2 className="border-b border-[#CFC7C0] py-6 text-center font-nhaasMd text-lg">
                Select Location
              </h2>

              <CloseIcon
                className="absolute top-1/2 right-[12px] h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 transform"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </Dialog.Title>
            <div className="px-23 pt-13 pb-8">
              {countries.map((country) => {
                return (
                  <Link
                    key={country._key}
                    to={country.href}
                    className="focus-outline mb-8 flex flex-row"
                  >
                    <SanityImage
                      dataset={sanityConfig.dataset}
                      projectId={sanityConfig.projectId}
                      sizes={['50vw, 100vw']}
                      className="mr-5  aspect-square h-[24px] w-[24px]"
                      src={country.flag.asset._ref}
                    />
                    <span className="font-nhaasReg text-md hover:underline">
                      {country.name}
                    </span>
                    &nbsp;
                    <span className="font-nhaasReg text-md">
                      ({country.currency})
                    </span>
                  </Link>
                );
              })}
            </div>
            {/* ... */}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
