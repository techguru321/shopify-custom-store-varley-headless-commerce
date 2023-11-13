import clsx from 'clsx';
import {useProductOptions} from '@shopify/hydrogen';
import SelectedVariantAddToCartButton from './buttons/SelectedVariantAddToCart.client';

export default function CardOptionsHover() {
  const {variants, selectedOptions, selectedVariant} = useProductOptions();
  const cartButtonList = variants.map((variant) => {
    if (variant.title.includes(selectedOptions.Color)) {
      const label = variant.title.split(' / ')[1];
      return (
        <SelectedVariantAddToCartButton
          className={clsx([
            variant.availableForSale
              ? 'cursor-pointer hover:border-black'
              : 'no-size-selected cursor-not-allowed opacity-50',
            'relative m-1 flex h-[36px] w-[36px] items-center justify-center border border-transparent font-nhaasReg text-xs text-black',
          ])}
          showSoldOut="false"
          label={label}
          variant_id={variant?.id}
          key={variant?.id}
        />
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
