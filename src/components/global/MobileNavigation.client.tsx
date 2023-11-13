// @ts-expect-error incompatibility with node16 resolution
import {Dialog, Transition} from '@headlessui/react';
import {Link} from '@shopify/hydrogen';
import clsx from 'clsx';
import {Fragment} from 'react';
import type {SanityMenuLink} from '../../types';
import CloseIcon from '../icons/Close';
import MenuIcon from '../icons/Menu';
import UserIcon from '../icons/User';
import WishlistIcon from '../icons/Wishlist';
import ContactUsIcon from '../icons/ContactUs';
import HelpCentreIcon from '../icons/HelpCentre';
import NavigationArrowRightIcon from '../icons/NavigationArrowRight';
import MobileLogoIcon from '../icons/MobileLogo';
import SearchIcon from '../icons/Search';

type Props = {
  open: boolean;
  setOpenMobileMenu: (open: boolean) => void;
  menuLinks: SanityMenuLink[];
  menuPageLinks: SanityMenuLink[];
  handleClickMenuItem: (link: any) => void;
};

export default function MobileNavigation({
  open,
  setOpenMobileMenu,
  menuLinks,
  menuPageLinks,
  handleClickMenuItem,
}: Props) {
  const handleClose = () => setOpenMobileMenu(false);
  const handleOpen = () => setOpenMobileMenu(true);
  const handleClick = (link: any) => {
    setOpenMobileMenu(false);
    handleClickMenuItem(link);
  };

  return (
    <>
      <button
        className={clsx(
          'absolute left-0 bottom-[2px] flex h-header-sm items-center text-sm font-bold duration-200',
          'hover:opacity-50',
          'ml-4',
          'lg:hidden',
        )}
        onClick={handleOpen}
      >
        <MenuIcon />
      </button>

      <Transition show={open}>
        <Dialog onClose={handleClose}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-40 bg-black bg-opacity-20"
            />
          </Transition.Child>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed top-0 left-0 right-0 bottom-0 z-50 h-full w-[90%] overflow-y-auto bg-white pb-40">
              {/* Header */}
              <header className="flex h-header-sm items-center justify-between px-4">
                <Link to="/">
                  <MobileLogoIcon />
                </Link>
                <button type="button" onClick={handleClose}>
                  <CloseIcon />
                </button>
              </header>

              {/* Links */}
              <div className="">
                <div className="w-full">
                  <div className="px-5">
                    <form
                      action="/search"
                      method="get"
                      className="flex w-full space-x-2 border-b  pb-[4px]"
                      autoComplete="off"
                    >
                      <SearchIcon />
                      <input
                        type="text"
                        placeholder="Search here..."
                        className="w-full font-nhaasLt text-md"
                        name="q"
                        autoComplete="off"
                      />
                      <input
                        type="submit"
                        className="absolute -left-[9999px]"
                      />
                    </form>
                  </div>

                  {menuLinks?.map((link) => {
                    if (link._type === 'navigation.section') {
                      return (
                        <div
                          key={link._key}
                          className="even:white flex items-center justify-between border-b border-lightGray1 py-4 px-5 hover:bg-[#F6F5F1]"
                        >
                          <Link
                            className="font-plantinItalic text-[25px]"
                            onClick={handleClose}
                            to={`/${link.navigationItem._type}s/${link.navigationItem.store.slug.current}`}
                          >
                            {link.navigationItem.altTitle}
                          </Link>
                          <NavigationArrowRightIcon
                            onClick={() => handleClick(link)}
                          />
                        </div>
                      );
                    }
                    if (link._type === 'linkExternal') {
                      return (
                        <div
                          className="even:white flex items-center border-b border-lightGray1 px-5 hover:bg-[#F6F5F1]"
                          key={link._key}
                        >
                          <a
                            className="flex items-center justify-between py-4 font-plantinItalic text-[25px]"
                            href={link.url}
                            onClick={handleClose}
                            rel="noreferrer"
                            target={link.newWindow ? '_blank' : '_self'}
                          >
                            {link.altTitle}
                          </a>
                        </div>
                      );
                    }
                    if (link._type === 'linkInternal') {
                      const slug = link.reference.slug
                        ? link.reference.slug.current
                        : link.reference.store.slug.current;
                      return (
                        <div
                          className="even:white flex items-center border-b border-lightGray1 px-5 hover:bg-[#F6F5F1]"
                          key={link._key}
                        >
                          <Link
                            className={`py-4 font-plantinItalic text-[25px]`}
                            onClick={handleClose}
                            to={`${link.reference._type}s/${slug}`}
                          >
                            {link.altTitle}
                          </Link>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>

                <div className="border-b border-lightGray1 py-8">
                  {menuPageLinks.map((link) => {
                    if (link._type === 'linkInternal') {
                      const slug = link.reference.slug
                        ? link.reference.slug.current
                        : link.reference.store.slug.current;
                      return (
                        <div className="mt-2 flex items-center space-x-2 px-5">
                          {/* <WishlistIcon width="14" height="13" /> */}
                          <Link
                            className="font-normal"
                            onClick={handleClose}
                            to={`${link.reference._type}s/${slug}`}
                          >
                            {link.altTitle}
                          </Link>
                        </div>
                      );
                    }

                    if (link._type === 'linkExternal') {
                      const slug = link.reference.slug
                        ? link.reference.slug.current
                        : link.reference.store.slug.current;
                      return (
                        <div className="mt-2 flex items-center space-x-2 px-5">
                          <a
                            className="font-normal"
                            href={link.url}
                            onClick={handleClose}
                            rel="noreferrer"
                            target={link.newWindow ? '_blank' : '_self'}
                          >
                            {link.altTitle}
                          </a>
                        </div>
                      );
                    }
                  })}

                  {/* <div className="-ml-2">
                    <CountrySelect align="left" />
                  </div> */}
                </div>

                <div className="flex items-center justify-center space-x-2 px-5 pt-8">
                  <Link
                    className="flex h-[43px] min-w-[184px] items-center justify-center rounded-full border text-center font-normal hover:bg-black hover:text-white"
                    onClick={handleClose}
                    to="/account/login"
                  >
                    Log In
                  </Link>
                </div>
                <div className="mt-0 flex items-center justify-center px-5 py-1">
                  <Link
                    className="flex h-[43px] min-w-[184px] items-center justify-center text-center font-normal"
                    onClick={handleClose}
                    to="/account/register"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
