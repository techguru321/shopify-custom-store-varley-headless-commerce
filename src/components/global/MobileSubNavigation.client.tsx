import { Dialog, Transition } from "@headlessui/react";
import {Link} from '@shopify/hydrogen'
import { Fragment, useEffect, useState } from "react";
import { SanityMenuLink } from "../../types"
import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';
import { LeftArrowIcon } from "../icons/LeftArrow";
import CloseIcon from '../icons/Close';

type Props = {
  menuLinks: SanityMenuLink[];
  handleClose: (open: boolean) => void;
  handleBack: () => void;
  openStatus: Boolean;
}

export default function MobileSubNavigation({menuLinks, handleClose, handleBack, openStatus} : Props) {
  return (
    <Transition show={openStatus}>
      <Dialog onClose={handleClose}>
        {/* panel */}
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
            <header className="flex items-center justify-between pr-7 pt-8 pl-8 pb-10">
              <button type="button" onClick={handleBack}>
                <LeftArrowIcon />
              </button>
              <button type="button" onClick={handleClose}>
                <CloseIcon />
              </button>
            </header>
            <div className={`text-3xl pr-7 pl-8 pb-4 font-plantinItalic border-b border-lightGray1`}>
              {menuLinks.title ? menuLinks.title : menuLinks.navigationItemName }
            </div>
            <div className="pl-8 pr-7 mt-6">
              {menuLinks.links?.map((item) => {
                if(item._type == 'navigation.link') {
                  return (
                    <div key={item._key} className="flex flex-col space-y-7">
                      {item.children?.map(child => {
                        return (
                          <Link
                            className="font-nhaasReg text-xl"
                            onClick={handleClose}
                            to={
                              !child.reference 
                                ? child.url 
                                : (
                                  child.reference._type === 'collection' ? 
                                    `collections/${child.reference.store.slug.current}` : 
                                    `products/${child.reference.store.slug.current}`
                                )
                            }
                          >
                            {child.altTitle}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }
              })}
            </div>
            <div className='mt-9 pl-8  w-[90%] overflow-auto'>
              <div className="min-w-[410px] flex space-x-5">
                {menuLinks.links?.map((item) => {
                  if (item._type == 'navigation.image') {
                    const image = item.image;
                    return (
                      <div className='w-[112px]'>
                        <Link
                          to={`collections/${item.callToAction.links[0].reference.store.slug.current}`}
                          className="space-y-2"
                        >
                          <SanityImage
                            crop={image?.crop}
                            dataset={sanityConfig.dataset}
                            hotspot={image?.hotspot}
                            layout="responsive"
                            projectId={sanityConfig.projectId}
                            sizes={['50vw, 100vw']}
                            className="h-[141px]  w-[112px] aspect-[141/112]"
                            src={image?.asset._ref}
                          />
                          <span className="font-nhaasReg text-xl flex justify-center">
                            {item.callToAction.title}
                            {/* <StubbyArrowRightIcon className="ml-4" /> */}
                          </span>
                        </Link>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}