import clsx from 'clsx';
import useSanityQuery from '../../hooks/useSanityQuery';
import {PORTABLE_TEXT} from '../../fragments/sanity/portableText/portableText';
import groq from 'groq';
import PortableText from '../portableText/PortableText.server';
import {Block} from '@sanity/types/dist/dts/index';

export default function VarleyFooterLegal() {
  const {data: footer} = useSanityQuery<{
    text?: Block[];
  }>({
    query: QUERY_SANITY,
  });

  return (
    <div
      className={clsx([
        'flex flex-col content-between md:flex-row md:items-start',
        'mx-auto max-w-[1200px]',
        'bg-black text-white',
        'pt-6 pb-10 sm:pb-5 sm:pt-19 md:pt-20 md:pb-6',
      ])}
    >
      <div className="order-1 mt-5 w-full min-w-[220px] flex-1 md:order-none md:mt-0">
        <ul className="flex flex-wrap justify-center md:justify-start">
          {footer?.footerLegal.map((link: any, index: number) => {
            const url = link.newWindow
              ? link.url
              : link.reference._type !== 'home'
              ? `/${link.reference._type}s/${link.reference.slug.current}`
              : '/';
            const lineBreak = <li className="h-[14px] w-full"></li>;
            return (
              <>
                {index !== 0 && index % 2 === 0 && lineBreak}
                <li key={link._key}>
                  <a
                    className={clsx([
                      'block font-nhaasLt',
                      'text-[12px] sm:text-sm md:text-xs',
                      index % 2 !== 0
                        ? 'border-l px-[2px] pl-[5px]'
                        : 'pr-[2px]',
                      'md:leading-6 pr-[5px] leading-none',
                    ])}
                    href={url}
                    rel="noreferrer"
                    target={link.newWindow ? '_blank' : '_self'}
                  >
                    {link.altTitle}
                  </a>
                </li>
              </>
            );
          })}
        </ul>
      </div>

      {footer?.text && (
        <div className="order-none mb-5 w-full text-center sm:mb-0 md:order-1">
          <PortableText
            blocks={footer.text}
            className={clsx(
              'font-nhaasLt',
              'text-[12px] sm:text-sm md:text-xs',
            )}
          />
        </div>
      )}

      <div
        className={clsx([
          'order-2 flex flex-col',
          'font-nhaasLt',
          'text-[12px] sm:text-sm md:text-xs',
          'mt-5 md:mt-8',
        ])}
      >
        <div className="text-center md:whitespace-nowrap md:text-right">
          © {new Date().getFullYear()} Varley Clothing, Ltd. All rights reserved
        </div>
      </div>
    </div>
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
    },
    footerLegal[]{
      _key,
      _type,
      altTitle,
      newWindow,
      url,
      reference->
    },
    text[]{
        ${PORTABLE_TEXT}
    }
  }
`;
