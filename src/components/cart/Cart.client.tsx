// @ts-expect-error incompatibility with node16 resolution
import {Dialog, Transition} from '@headlessui/react';
import {
  CartCheckoutButton,
  CartCost,
  CartLineImage,
  CartLinePrice,
  CartLineProductTitle,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
  CartLines,
  CartShopPayButton,
  Link,
  useCart,
  useCartLine,
} from '@shopify/hydrogen';
import {Fragment} from 'react';
import clsx from 'clsx';
import CloseIcon from '../icons/Close';
import Button, {defaultButtonStyles} from '../elements/Button';
import {useCartUI} from './CartUIProvider.client';
import RemoveItemIcon from '../icons/RemoveItem';
import MinusIcon from '../icons/Minus';
import PlusIcon from '../icons/Plus';
import MoneyPrice from '../product/money/Price.client';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

/**
 * A client component that contains the merchandise that a customer intends to purchase, and the estimated cost associated with the cart
 */

export default function Cart() {
  const {isCartOpen, closeCart} = useCartUI();
  const {lines, totalQuantity} = useCart();

  return (
    <Transition show={isCartOpen}>
      <Dialog onClose={closeCart}>
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
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in-out duration-500"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="rounded-l-none fixed top-0 left-0 right-0 bottom-0 z-40 flex h-full w-full flex-col overflow-y-auto bg-white p-7.5 md:left-auto md:bottom-auto md:w-[470px]">
            <CartHeader numLines={lines.length} />
            <div className="sticky top-[37px] border-b bg-white py-3 text-center font-nhaasReg text-xs font-normal">
              Free Delivery & Returns on all UK orders
            </div>

            {totalQuantity === 0 ? (
              <CartEmpty />
            ) : (
              <>
                <CartItems />
                <CartFooter />
              </>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

function CartHeader({numLines}: {numLines: number}) {
  const {closeCart} = useCartUI();
  return (
    <header className="sm:min-h-20 sticky top-0 flex h-header-sm items-start justify-between border-b bg-white">
      <div className="mb-2 font-plantinItalic text-xl md:text-2xl md:font-normal">
        Your Bag
      </div>
      <button type="button" onClick={closeCart}>
        <CloseIcon />
      </button>
    </header>
  );
}

function CartItems() {
  return (
    <div
      className="flex-grow overflow-auto"
      role="table"
      aria-label="Shopping cart"
    >
      <div role="row" className="sr-only">
        <div role="columnheader">Product image</div>
        <div role="columnheader">Product details</div>
      </div>
      <CartLines>
        <LineInCart />
      </CartLines>
    </div>
  );
}

function LineInCart() {
  const {merchandise} = useCartLine();

  const firstVariant = merchandise.selectedOptions[0];
  const hasDefaultVariantOnly =
    firstVariant.name === 'Title' && firstVariant.value === 'Default Title';

  return (
    <div role="row" className="flex py-8">
      {/* Image */}
      <div role="cell" className="mr-5 aspect-square w-[160px] flex-shrink-0">
        <Link to={`/products/${merchandise.product.handle}`}>
          <CartLineImage
            loaderOptions={{width: 160, height: 208, crop: 'center'}}
          />
        </Link>
      </div>

      <div role="cell" className="flex w-full flex-col justify-between">
        <div>
          {/* Title */}
          <Link
            to={`/products/${merchandise.product.handle}`}
            className="hover:underline"
          >
            <CartLineProductTitle className="font-plantinItalic text-xl font-normal" />
          </Link>

          {/* Options */}
          {!hasDefaultVariantOnly && (
            <ul className="mt-1 font-nhaasLt text-lg leading-[27px]">
              {merchandise.selectedOptions.map(({name, value}) => (
                <li key={name}>
                  {name}: {value}
                </li>
              ))}
            </ul>
          )}

          {/* Price */}
          {/* <CartLinePrice className="font-nhaasLt text-lg leading-[27px]" /> */}
          <div className="font-nhaasLt text-lg leading-[27px]">
            <MoneyPrice money={merchandise.priceV2} />
          </div>
        </div>

        <div className="flex justify-between">
          {/* Quantity */}
          <CartItemQuantity />

          {/* Remove */}
          <div role="cell" className="mr-3 flex items-center justify-between">
            <CartLineQuantityAdjustButton
              adjust="remove"
              aria-label="Remove from cart"
              className="disabled:pointer-events-all disabled:cursor-wait"
            >
              <RemoveItemIcon />
            </CartLineQuantityAdjustButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItemQuantity() {
  return (
    <div className="flex items-center">
      <CartLineQuantityAdjustButton
        adjust="decrease"
        aria-label="Decrease quantity"
        className="disabled:pointer-events-all flex h-[32px] w-[32px] items-center justify-center border border-brandClay disabled:cursor-wait"
      >
        <MinusIcon />
      </CartLineQuantityAdjustButton>
      <CartLineQuantity
        as="div"
        className="flex h-[32px] w-[32px] items-center justify-center border-y border-brandClay text-sm font-bold text-black"
      />
      <CartLineQuantityAdjustButton
        adjust="increase"
        aria-label="Increase quantity"
        className="disabled:pointer-events-all flex h-[32px] w-[32px] items-center justify-center border border-brandClay disabled:cursor-wait"
      >
        <PlusIcon />
      </CartLineQuantityAdjustButton>
    </div>
  );
}

function CartFooter() {
  const {closeCart} = useCartUI();
  const {cost} = useCart();
  return (
    <footer className="sticky bottom-0 bg-white">
      <div className="relative flex flex-col">
        <div role="table" aria-label="Cost summary">
          <div role="row" className="mt-4 mb-6 hidden sm:block">
            <a href="#" className="font-nhaasReg text-md font-bold underline">
              Been referred by a friend?
            </a>
          </div>

          {/* subtotal */}
          {/* <div
            className="flex justify-between border-t border-gray p-4"
            role="row"
          >
            <span className="text-darkGray" role="rowheader">
              Subtotal
            </span>
            <CartCost
              amountType="subtotal"
              className="text-right font-bold"
              role="cell"
            />
          </div> */}

          {/* total */}
          <div
            role="row"
            className="text-medium mb-8 flex justify-between font-nhaasMd text-xl"
          >
            <span role="rowheader">Total</span>
            {/* <CartCost amountType="total" role="cell" /> */}
            <MoneyPrice
              money={
                {
                  amount: cost.totalAmount.amount,
                  currencyCode: cost.totalAmount.currencyCode,
                } as MoneyV2
              }
            />
          </div>

          {/* shipping */}
          {/* <div
            role="row"
            className="flex justify-between border-t border-gray p-4"
          >
            <span className="text-darkGray" role="rowheader">
              Shipping
            </span>
            <span role="cell" className="font-bold uppercase">
              Free
            </span>
          </div> */}

          <div
            role="row"
            className="text-center font-nhaasReg text-md font-normal"
          >
            Voucher code? Apply at payment stage
          </div>
        </div>

        <div className="mt-3 mb-7 flex w-full gap-3">
          {/* <CartShopPayButton
            className={clsx([defaultButtonStyles({tone: 'shopPay'}), 'w-1/2'])}
            width="100%"
          /> */}
          <button
            className={clsx([
              defaultButtonStyles({mode: 'outline'}),
              'w-1/2 whitespace-nowrap',
            ])}
            onClick={closeCart}
          >
            Continue Shopping
          </button>

          <CartCheckoutButton
            className={clsx([defaultButtonStyles(), 'w-1/2'])}
          >
            Checkout now
          </CartCheckoutButton>
        </div>
      </div>
    </footer>
  );
}

function CartEmpty() {
  const {closeCart} = useCartUI();
  return (
    <div className="flex flex-col px-8 pt-6">
      <p className="mb-4 text-lg font-bold">
        There&rsquo;s nothing in here...yet.
      </p>
      <Button onClick={closeCart} type="button">
        Continue Shopping
      </Button>
    </div>
  );
}
