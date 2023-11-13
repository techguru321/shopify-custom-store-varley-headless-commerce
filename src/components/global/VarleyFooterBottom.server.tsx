import clsx from 'clsx';
import LogoCurvedIcon from '../icons/LogoCurved';
import CountrySelect from './CountrySelect.client';
import useSanityQuery from '../../hooks/useSanityQuery';
import groq from 'groq';
import FacebookIcon from '../icons/Facebook';
import InstagramIcon from '../icons/Instagram';
import PinterestIcon from '../icons/Pinterest';
import Accessibility from './Accessibility.client';

export default function VarleyFooterBottom() {
  const {data} = useSanityQuery({
    query: QUERY_SANITY,
  });
  const socialLinks = data?.socials.map((social) => {
    if (social.name === 'Facebook') {
      return (
        <li key={social._key}>
          <a href={social.href} className="h-5  w-5" target="_blank">
            <FacebookIcon />
          </a>
        </li>
      );
    }

    if (social.name === 'Instagram') {
      return (
        <li key={social._key}>
          <a href={social.href} className="h-5  w-5" target="_blank">
            <InstagramIcon />
          </a>
        </li>
      );
    }

    if (social.name === 'Pinterest') {
      return (
        <li key={social._key}>
          <a href={social.href} className="h-5  w-5" target="_blank">
            <PinterestIcon />
          </a>
        </li>
      );
    }
  });

  return (
    <>
      <div
        className={clsx(
          'hidden sm:flex',
          'mx-auto  max-w-[1200px]  flex-col  flex-wrap  items-start border-b border-white  bg-black text-white  lg:flex-row  lg:content-between  lg:items-center lg:items-baseline lg:pt-[11px] lg:pb-[37px]', //
          'relative',
        )}
      >
        <ul
          className={clsx(
            'flex', //
            'order-1  w-full  flex-1  justify-center  space-x-10  py-10  lg:order-none  lg:w-auto  lg:justify-start  lg:space-x-3.5  lg:border-0  lg:py-0',
          )}
        >
          {socialLinks}
        </ul>
        <div className="hidden  lg:block">
          <LogoCurvedIcon />
        </div>

        {/* Country select */}
        <div
          className={clsx(
            'flex', //
            'order-none  w-full   flex-1  items-center  border-b  border-white  py-5  font-plantinItalic text-xl font-normal  lg:order-1  lg:w-auto  lg:justify-end  lg:border-0  lg:py-0  lg:font-nhaasReg lg:text-sm',
          )}
        >
          Store: <CountrySelect countries={data?.countries} icon={true} />
        </div>

        {/* accessibility */}
        <Accessibility />
      </div>

      <div className={`flex justify-between sm:hidden`}>
        <ul
          className={clsx(
            'flex', //
            'justify-center  space-x-10  pt-15 pb-2',
          )}
        >
          {socialLinks}
        </ul>
        {/* accessibility */}
        <Accessibility />
      </div>
    </>
  );
}

const QUERY_SANITY = groq`
*[_type == "settings"][0] {
  socials[] {
    _key,
    _type,
    ...social-> {
      name,
      href
    }
  },
  countries[] {
    _key,
    _type,
    ...country->
  }
}`;
