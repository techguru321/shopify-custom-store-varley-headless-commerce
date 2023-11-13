import {useCart} from '@shopify/hydrogen';
import {useCartUI} from './CartUIProvider.client';
import {BagIcon} from '../icons/Bag';
import clsx from 'clsx';

type Props = {
  onClick?: () => void;
};

/**
 * A client component that defines the behavior when a user toggles a cart
 */
export default function CartToggle({onClick}: Props) {
  const {totalQuantity} = useCart();
  const {isCartOpen, toggleCart} = useCartUI();

  return (
    <div
      className="relative  hover:cursor-pointer"
      aria-expanded={isCartOpen}
      aria-controls="cart"
      onClick={() => {
        toggleCart();
        onClick?.();
      }}
    >
      <BagIcon />
      <span className={clsx([
        "absolute  bottom-[-4px]  right-[-5px]  flex  h-[14px]  w-4  transform-none  items-center  justify-center  rounded  bg-black pt-[2px]  text-[11px]  text-white",
        !totalQuantity ? 'hidden' : ''
      ])}>
        {totalQuantity}
      </span>
    </div>
  );
}
