import {Link, ProductOptionsProvider} from '@shopify/hydrogen';
import clsx from 'clsx';
import type {
  ProductWithNodes,
  SanityCustomProductOptionColor,
} from '../../types';
import Badge from '../elements/Badge';
import MoneyCompareAtPrice from './money/CompareAtPrice.client';
import CardColorOptions from './CardColorOptions.client';
import CardSizeOptions from './CardSizeOptions.client';
import MoneyPrice from './money/Price.client';
import CardDrawer from './CardDrawer.client';
import ProductImageCarousel from './ProductImageCarousel.client';

type Props = {
  imageAspectClassName?: string;
  customProductOptionColors?: SanityCustomProductOptionColor[];
  storefrontProduct?: ProductWithNodes;
  initialVariantID?: string;
  selectedVariantID?: string;
};

export default function ProductCard({
  imageAspectClassName = 'aspect-square',
  customProductOptionColors,
  storefrontProduct,
  initialVariantID = '',
  selectedVariantID = '',
}: Props) {
  const firstVariantID =
    selectedVariantID &&
    storefrontProduct?.variants.nodes.find(
      (variant) => variant.id === selectedVariantID,
    )
      ? selectedVariantID
      : !initialVariantID
      ? storefrontProduct?.variants.nodes[0].id
      : initialVariantID;

  const selectedVariant = storefrontProduct?.variants.nodes.find((variant) => {
    return variant.id === firstVariantID;
  });
  const options = storefrontProduct?.options;
  const selectedOptions: string[] = [];
  selectedVariant?.selectedOptions.forEach((option) => {
    selectedOptions[option.name] = option.value;
  });
  const images = storefrontProduct?.images?.nodes.filter((image) => {
    return image.altText == selectedOptions.Color;
  });

  const available_color_option: any = options?.find((option) => {
    return option.name == 'Color';
  });
  const available_colors = available_color_option.values;
  // rich title or custom format of storefront product title
  let title;
  let metafield: any = '';
  if (storefrontProduct?.metafields) {
    metafield = storefrontProduct?.metafields.find((item) => {
      return item?.namespace === 'custom_fields' && item.key == 'rich_title';
    });
  }
  if (metafield) {
    title = (
      <>
        <span
          className="font-plantin"
          dangerouslySetInnerHTML={{__html: metafield.value}}
        ></span>
      </>
    );
  } else {
    title = (
      <>
        <span className="font-plantin">
          {storefrontProduct?.title?.split('-')[0]}{' '}
          <i>{storefrontProduct?.title?.split('-')[1]}</i>
        </span>
      </>
    );
  }

  return (
    <div className="group relative">
      <div
        className={clsx([
          imageAspectClassName,
          'relative flex items-center justify-center bg-lightGray object-cover',
          '',
        ])}
      >
        <ProductImageCarousel
          images={images}
          link={'/products/' + storefrontProduct?.handle}
        />
        {/* Badges */}
        <div className="absolute top-4 left-4">
          {/* Sale */}
          {storefrontProduct?.availableForSale &&
            selectedVariant?.compareAtPrice && (
              <Badge label="Sale" tone="critical" />
            )}
          {/* Sold out */}
          {!storefrontProduct?.availableForSale && (
            <Badge label="Sold out" tone="" />
          )}
        </div>

        {/* size options in hover */}
        <div
          className={clsx(
            'duration-600 absolute bottom-0 w-full translate-y-[10px] transform opacity-0 transition ease-in-out md:group-hover:translate-y-[0px] md:group-hover:opacity-100',
          )}
        >
          <ProductOptionsProvider
            data={storefrontProduct}
            initialVariantId={selectedVariant?.id}
          >
            <CardSizeOptions />
          </ProductOptionsProvider>
        </div>
      </div>

      <div className="mt-3 pl-4 text-md sm:pl-0">
        <div className="space-y-1">
          {/* Title */}
          <Link
            className={clsx('text-xl font-normal')}
            to={`/products/${storefrontProduct?.handle}`}
          >
            {title}
          </Link>
        </div>
        <div>
          {/* Price / compare at price */}
          <div className="flex font-nhaasReg  text-md">
            {selectedVariant?.compareAtPrice && (
              <span className="text-darkGray">
                <MoneyCompareAtPrice money={selectedVariant?.compareAtPrice} />
              </span>
            )}
            <MoneyPrice money={selectedVariant?.priceV2} />
          </div>

          <div className="font-nhaasReg  text-md md:hidden">
            {available_colors.length} colours available
          </div>

          <ProductOptionsProvider
            data={storefrontProduct}
            initialVariantId={selectedVariant?.id}
          >
            <CardColorOptions
              customProductOptionColors={customProductOptionColors}
              colorOptionValues={available_colors}
            />
          </ProductOptionsProvider>
        </div>
        <ProductOptionsProvider
          data={storefrontProduct}
          initialVariantId={selectedVariant?.id}
        >
          <CardDrawer
            customProductOptionColors={customProductOptionColors}
            storefrontProduct={storefrontProduct}
          />
        </ProductOptionsProvider>
      </div>
    </div>
  );
}
