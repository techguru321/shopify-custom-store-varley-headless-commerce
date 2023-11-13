import clsx from 'clsx';
import {Link} from '@shopify/hydrogen';
import useSanityQuery from '../../hooks/useSanityQuery';
// import type {SanityLink} from '../../types';
import groq from 'groq';
import LogoCurvedIcon from '../icons/LogoCurved';
import AccordionNav from './AccordionNav.client';
import {Key} from 'react';
import Klaviyo from './klaviyo.server';

export default function VarleyFooterMain() {
  const {data: footer} = useSanityQuery({query: QUERY_SANITY});

  const renderLinks = footer?.footerCols?.map(
    (
      link: {footerColName: string; reference: any[]},
      i: Key | null | undefined,
    ) => {
      return (
        // Footer Mobile
        <div key={i}>
          <div
            className={clsx(
              'block  lg:hidden', //
              '',
            )}
          >
            <AccordionNav link={link} />
          </div>
          {/* Footer Desktop */}
          <div className="hidden  min-w-[120px] lg:block">
            <h4 className="mb-9  font-plantinItalic  text-xl  font-normal">
              {link?.footerColName}
            </h4>
            <ul className="flex  flex-col space-y-5" key={link?._key}>
              {link?.reference.map((l) => {
                if (l._type === 'linkExternal') {
                  return (
                    <li key={l?._key}>
                      <a
                        className="font-nhaasReg  text-sm  font-normal"
                        href={l.url}
                        rel="noreferrer"
                        target={l.newWindow ? '_blank' : '_self'}
                      >
                        {l.altTitle}
                      </a>
                    </li>
                  );
                }
                if (l._type === 'linkInternal') {
                  return (
                    <li key={l?._key}>
                      <a className="font-nhaasReg  text-sm  font-normal">
                        {l.altTitle}
                      </a>
                    </li>
                  );
                }
                if (!l.slug) {
                  return null;
                }
                return (
                  <li key={l?._key}>
                    <Link
                      className="font-nhaasReg  text-sm  font-normal"
                      to={`/pages/${l.slug.current}`}
                    >
                      {l?.altTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    },
  );

  return (
    <>
      <div className="mb-15  flex  justify-center  lg:hidden">
        <LogoCurvedIcon />
      </div>
      <div
        className={clsx(
          'm-auto flex  max-w-[1200px]  flex-wrap  justify-between', //
          '',
        )}
      >
        <div
          className={clsx(
            'order-1 flex w-full  flex-col  justify-between lg:order-none  lg:w-auto', //
            'md:flex-row',
          )}
        >
          <div
            className={clsx(
              'flex w-full  flex-col  self-start pt-8 text-md font-bold lg:my-16  lg:flex-row  lg:gap-15  lg:pt-0',
              'lg:my-0',
            )}
          >
            {renderLinks}
          </div>
        </div>

        <div className="order-none  w-full lg:order-1  lg:w-[264px]">
          <h4 className="mb-7  w-auto  max-w-[350px]  font-plantinItalic  text-xl  font-normal">
            Sign up for our Newsletter
          </h4>
          <Klaviyo />
        </div>
      </div>
    </>
  );
}

const QUERY_SANITY = groq`
*[_type == "settings"][0].footer {
    footerCols[]{
      _key,
      _type,
      footerColName,
      reference[]{
        _key,
        _type,
        title,
        altTitle,
        url,
        ...reference->
      }
    }
  }
`;
