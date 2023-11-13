import clsx from 'clsx';
import {AddToCartButton, useProductOptions} from '@shopify/hydrogen';

export default function CardSizeOptions() {
  const {variants, selectedOptions} = useProductOptions();
  const cartButtonList = variants?.map((variant) => {
    const selectedLabel: string[] = variant?.title.split(' / ');
    if (selectedLabel[0] === selectedOptions.Color) {
      return (
        <AddToCartButton
          className={clsx([
            variant?.availableForSale
              ? 'cursor-pointer hover:border-black'
              : 'no-size-selected cursor-not-allowed opacity-50',
            'relative m-1 flex h-[36px] w-[36px] items-center justify-center border border-transparent font-nhaasReg text-xs text-black',
          ])}
          variantId={variant?.id}
        >
          {selectedLabel[1]}
        </AddToCartButton>
      );
    }
  });
  return (
    <div
      className={clsx([
        'flex w-full flex-wrap justify-center bg-white/80 px-2 py-2',
      ])}
    >
      {cartButtonList}
    </div>
  );
}
