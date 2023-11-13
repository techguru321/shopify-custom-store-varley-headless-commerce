import {Link} from '@shopify/hydrogen';
import LogoIcon from '../icons/Logo';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
import HeaderActions from './HeaderActions.client';
type Props = {
  loggedIn: boolean;
  isHelpCentre: boolean;
  klevuApi: {
    url: string;
    key: string;
  };
};
export default function HeaderBackground({
  loggedIn,
  isHelpCentre,
  klevuApi,
}: Props) {
  const [scrolledDown, setScrolledDown] = useState(false);

  const handleScroll = () => {
    setScrolledDown(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Trigger handler on mount to account for reloads
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div class={` px-4 md:px-[100px]`}>
      {/* Background */}
      <div
        className={clsx([
          'relative mt-[27px] mb-[29px]',
          // !isHelpCentre ? 'lg:mb-0' : '',
          // scrolledDown ? 'opacity-100' : 'opacity-0',
        ])}
      >
        {/* Logo */}
        <Link to="/" className="flex justify-center">
          <div className={clsx('flex w-[127px]', 'md:w-[140px]')}>
            <LogoIcon
              className="h-auto w-full"
              classNameMark={clsx([
                'duration-700',
                scrolledDown ? 'translate-y-1/4' : 'translate-y-0',
              ])}
              classNameType={clsx([
                'duration-500',
                scrolledDown
                  ? 'opacity-0 translate-y-1'
                  : 'opacity-100 translate-y-0',
              ])}
            />
          </div>
        </Link>

        {/* Accounts, country selector + cart toggle */}
        {!isHelpCentre && (
          <HeaderActions
            loggedIn={loggedIn}
            isHelpCentre={isHelpCentre}
            klevuApi={klevuApi}
          />
        )}
      </div>
    </div>
  );
}
