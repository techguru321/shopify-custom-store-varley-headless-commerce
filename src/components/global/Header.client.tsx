import clsx from 'clsx';
import {useState, useRef, useEffect} from 'react';
import type {SanityDesktopMenu, SanityMenuLink} from '../../types';
import HeaderBackground from './HeaderBackground.client';
import MobileNavigation from './MobileNavigation.client';
import Navigation from './Navigation.client';
import EmblaCarousel from './EmblaCarousel.client';
import {LeftArrowIcon} from '../icons/LeftArrow';
import {Link} from '@shopify/hydrogen';
import MobileSubNavigation from './MobileSubNavigation.client';
import TopNavigation from './TopNavigation.client';
import CountrySelect from './CountrySelect.client';

type Props = {
  desktopMenuLinks?: SanityDesktopMenu;
  mobileMenuLinks?: SanityMenuLink[];
  alerts: any;
  loggedIn: boolean;
  url: string;
  klevuApi: {
    url: string;
    key: string;
  };
  countries: any[];
};

/**
 * A server component that specifies the content of the header on the website
 */
export default function Header({
  desktopMenuLinks,
  mobileMenuLinks,
  mobilePageMenuLinks,
  alerts,
  loggedIn,
  url,
  klevuApi,
  countries,
}: Props) {
  const [sticky, setSticky] = useState({isSticky: false, offset: 0});
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const handleClickMenuItem = (item: SanityMenuLink) => {
    setSelectedMenuItem(item);
    setOpenMobileSubmenu(true);
  };

  const headerRef = useRef(null);

  let isHelpCentre = false;

  if (
    !url.includes('about-varley') &&
    !url.includes('component-library') &&
    url.includes('pages')
  ) {
    isHelpCentre = true;
  }

  // handle scroll event
  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > elTopOffset) {
      setSticky({isSticky: true, offset: elHeight});
    } else {
      setSticky({isSticky: false, offset: 0});
    }
  };

  // add/remove scroll event listener
  useEffect(() => {
    const header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height);
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);
  return (
    <>
      {alerts && (
        <EmblaCarousel
          slides={alerts.globalAlerts.alerts}
          options={alerts.globalAlerts.carouselOptions}
          type="alerts"
          mobileType={undefined}
        />
      )}
      <header
        className={clsx([
          sticky.isSticky ? ' sticky  top-0' : 'relative',
          'z-40  w-full',
          'border-b  border-b-brandClay  bg-white ',
        ])}
        role="banner"
        ref={headerRef}
      >
        <div className="hidden justify-between bg-[#F6F5F1] px-4 sm:flex md:px-[100px]">
          <TopNavigation menuLinks={desktopMenuLinks?.desktopTopNavigation} />
          <div className="flex items-center font-nhaasLt text-sm leading-[20px] underline">
            Store: <CountrySelect countries={countries} icon={false} />
          </div>
        </div>
        <HeaderBackground
          loggedIn={loggedIn}
          isHelpCentre={isHelpCentre}
          klevuApi={klevuApi}
        />
        {isHelpCentre && (
          <Link
            to={`/`}
            className="absolute bottom-8 flex  items-center space-x-2"
          >
            <LeftArrowIcon className="mr-1  block  h-3" />
            <span className="font-nhaasMd text-sm">Shop</span>
          </Link>
        )}
        <div
          className={clsx([
            'align-center  relative  mx-auto flex h-full  w-full justify-center',
            isHelpCentre ? '' : 'max-w-[1400px]',
          ])}
        >
          {!isHelpCentre && mobileMenuLinks && (
            <MobileNavigation
              open={openMobileMenu}
              setOpenMobileMenu={setOpenMobileMenu}
              menuLinks={mobileMenuLinks}
              menuPageLinks={mobilePageMenuLinks}
              handleClickMenuItem={handleClickMenuItem}
            />
          )}
          {!isHelpCentre && mobileMenuLinks && (
            <MobileSubNavigation
              menuLinks={selectedMenuItem}
              handleClose={() => setOpenMobileSubmenu(false)}
              handleBack={() => {
                setOpenMobileSubmenu(false);
                setOpenMobileMenu(true);
              }}
              openStatus={openMobileSubmenu}
            />
          )}
          {!isHelpCentre && desktopMenuLinks && (
            <Navigation menuLinks={desktopMenuLinks.desktopNavigation} />
          )}
        </div>
      </header>
    </>
  );
}
