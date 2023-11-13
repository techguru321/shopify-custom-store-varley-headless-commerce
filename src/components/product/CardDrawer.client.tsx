import * as react from '@headlessui/react';
import {Fragment, useState} from 'react';
import CloseIcon from '../icons/Close';
import MoneyCompareAtPrice from './money/CompareAtPrice.client';
import type { ProductWithNodes, SanityCustomProductOptionColor } from '../../types';
import { AddToCartButton, useProductOptions } from '@shopify/hydrogen';
import CardDrawerOptions from './CardDrawerOptions.client';
import MoneyPrice from './money/Price.client';

type DrawerType = {
  title: string;
  open: boolean;
  onClose: void;
  children: any;
}
function Drawer({title, open, onClose, children}: DrawerType) {
  return (
    <react.Transition apear show={open} as={Fragment}>
      <react.Dialog as="div" className="relative z-50" onClose={onClose}>
        <react.Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 bottom-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </react.Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed bottom-0 left-0 flex w-full max-w-full">
              <react.Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <react.Dialog.Panel className="shadow-xl w-full max-w-lg transform bg-neutral-50 p-4 text-left align-middle antialiased transition-all">
                  <header className="sticky top-0 flex h-12 items-center justify-between">
                    <h2
                      id="cart-contents"
                      className="max-w-prose whitespace-pre-wrap font-plantin text-xl font-bold"
                    >
                      {title}
                    </h2>
                    <button
                      type="button"
                      className="text-primary hover:text-primary/50 -m-4 p-4 transition"
                      onClick={onClose}
                    >
                      <CloseIcon />
                    </button>
                  </header>
                  {children}
                </react.Dialog.Panel>
              </react.Transition.Child>
            </div>
          </div>
        </div>
      </react.Dialog>
    </react.Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = react.Dialog.Title;

function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}

type props = {
  storefrontProduct?: ProductWithNodes;
  customProductOptionColors?: SanityCustomProductOptionColor[];
}

export default function CardDrawer({
  storefrontProduct,
  customProductOptionColors
}: props) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const {selectedVariant} = useProductOptions();
  return (
    <>
      <button
        className="mt-3 mb-4 bg-white font-nhaasReg text-sm font-normal text-black disabled:opacity-20 sm:hidden"
        onClick={openDrawer}
      >
        + Quick add
      </button>
      <Drawer
        title={storefrontProduct?.title}
        open={isOpen}
        onClose={closeDrawer}
      >
        <div className="mb-5 flex font-nhaasReg text-sm sm:px-8 md:px-12">
          {selectedVariant?.compareAtPrice && (
            <span className="text-darkGray">
              <MoneyCompareAtPrice money={selectedVariant?.compareAtPrice} />
            </span>
          )}
          <MoneyPrice money={selectedVariant?.priceV2} />
        </div>
        
        <CardDrawerOptions customProductOptionColors={customProductOptionColors}/>
        
        <AddToCartButton
          className="h-[50px] text-white bg-black text-md font-nhaasReg mt-5 w-full"
          disabled={!selectedVariant?.availableForSale}
          variantId={selectedVariant?.id}
        >
          {selectedVariant?.availableForSale ? 'Add to bag' : 'Out of stock'}
        </AddToCartButton>
      </Drawer>
    </>
  );
}