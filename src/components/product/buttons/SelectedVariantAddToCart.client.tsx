import {AddToCartButton, useProductOptions} from '@shopify/hydrogen';
import {defaultButtonStyles} from '../../elements/Button';

/**
 * Wrapper around Hydrogen's `<AddToCartButton />` which will
 * display a disabled 'sold out' button if variant is not available for sale
 */

type Props = {
  label?: string;
  quantity?: number;
  showSoldOut?: boolean;
  className?: string;
  variant_id?: string;
};

export default function SelectedVariantAddToCartButton({
  label = 'Add to cart',
  quantity = 1,
  showSoldOut = true,
  className = '',
  variant_id = ''
}: Props) {
  const {selectedVariant} = useProductOptions();
  if (!selectedVariant) {
    return (
      <AddToCartButton
        className={className ? className : defaultButtonStyles()}
        disabled={true}
        quantity={quantity}
      >
        Select size
      </AddToCartButton>
    );
  }

  // if (!showSoldOut && !selectedVariant.availableForSale) {
  //   return null;
  // }

  if (!selectedVariant.availableForSale) {
    className += ' no-size-selected';
  }

  return (
    <AddToCartButton
      className={className ? className : defaultButtonStyles()}
      disabled={!selectedVariant.availableForSale}
      quantity={quantity}
      variantId={variant_id ? variant_id : selectedVariant?.id}
    >
      {selectedVariant.availableForSale || !showSoldOut ? label : 'Out of stock'}
    </AddToCartButton>
  );
}
