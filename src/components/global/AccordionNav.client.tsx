import {ChevronDownIcon} from '../icons/ChevronDown';
import {Disclosure} from '@headlessui/react';
import clsx from 'clsx';
import {Link} from '@shopify/hydrogen';
import type {SanityModuleAccordion} from '../../types';

type Props = {
  node: SanityModuleAccordion;
};

export default function AccordionBlock({link}: Props) {
  return (
    <Disclosure key={link?._key}>
      {({open}: {open: boolean}) => (
        <div className="flex flex-col border-b border-b-white">
          <Disclosure.Button
            className={clsx(
              'flex items-center justify-between py-5 text-lg font-bold',
              '',
            )}
          >
            <div className="truncate  font-plantinItalic  text-xl  font-normal">
              {link?.footerColName}
            </div>
            <div className="ml-4 shrink-0">
              {open ? (
                <ChevronDownIcon className="h-[24px] w-[24px] rotate-180  transition  duration-300 ease-in-out" />
              ) : (
                <ChevronDownIcon className="h-[24px] w-[24px] transition  duration-300  ease-in-out" />
              )}
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="pb-4 text-md">
            <ul className="flex  flex-col">
              {link?.reference.map((l) => {
                if (l._type === 'linkExternal') {
                  return (
                    <li className="mb-3 lg:mb-4" key={l?._key}>
                      <a
                        className="font-nhaasMd  text-sm  font-normal"
                        href={l.url}
                        rel="noreferrer"
                        target={l.newWindow ? '_blank' : '_self'}
                      >
                        {l.altTitle}
                      </a>
                    </li>
                  );
                }
                if (!l.slug) {
                  return null;
                }
                return (
                  <li className="mb-3 lg:mb-4" key={l?._key}>
                    <Link
                      className="font-nhaasMd  text-sm  font-medium"
                      to={`/pages/${l.slug.current}`}
                    >
                      {l?.altTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
