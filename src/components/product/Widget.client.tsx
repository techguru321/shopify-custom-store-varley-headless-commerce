import {AddToCartButton, useProductOptions} from '@shopify/hydrogen';
import {CSSProperties} from 'react';
import clsx from 'clsx';
import type {ProductWithNodes, SanityProductPage} from '../../types';
import {hasMultipleProductOptions} from '../../utils/productOptions';
import ProductOptions from './options/ProductOptions.client';
import PortableText from '../portableText/PortableText.client';
import MoneyPrice from './money/Price.client';
import MoneyCompareAtPrice from './money/CompareAtPrice.client';

type Props = {
  sanityProduct: SanityProductPage;
  storefrontProduct: ProductWithNodes;
  yotpoBottomLine: any;
};

function ProductPrices({
  storefrontProduct,
}: {
  storefrontProduct: ProductWithNodes;
}) {
  const {selectedVariant} = useProductOptions();

  if (!storefrontProduct || !selectedVariant) {
    return null;
  }
  return (
    <div className="product-information__price mt-5 mb-1 flex text-md">
      {selectedVariant.compareAtPriceV2 && (
        <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
      )}
      <MoneyPrice money={selectedVariant.priceV2} />
    </div>
  );
}

function ProductRatings({
  yotpoBottomLine,
}: {
  yotpoBottomLine: {total_review: any; average_score: any};
}) {
  if (!yotpoBottomLine || !yotpoBottomLine.total_review) {
    return null;
  }

  const starsStyle = {
    '--rating':
      yotpoBottomLine && yotpoBottomLine.average_score
        ? yotpoBottomLine.average_score?.toFixed(2)
        : '',
  } as CSSProperties;

  return (
    <div className="yotpo-stars flex items-center text-lg" style={starsStyle}>
      <a href="#product-reviews" className="text-sm underline">
        {yotpoBottomLine.total_review} Reviews
      </a>
    </div>
  );
}

export default function ProductWidget({
  sanityProduct,
  storefrontProduct,
  yotpoBottomLine,
}: Props) {
  const {selectedVariant, selectedOptions} = useProductOptions();
  const multipleProductOptions = hasMultipleProductOptions(
    storefrontProduct.options,
  );

  const availableForSale = selectedVariant?.availableForSale;

  const storefrontMetaRichTitleField = storefrontProduct?.metafields.find(
    (metafield) => {
      return metafield.key === 'rich_title';
    },
  );

  const storefrontMetaRichDescriptionField = storefrontProduct?.metafields.find(
    (metafield) => {
      return metafield.key === 'rich_description';
    },
  );

  const storefrontMetaRichTitle = storefrontMetaRichTitleField
    ? storefrontMetaRichTitleField.value
    : '';

  const storefrontMetaRichDescription = storefrontMetaRichDescriptionField
    ? storefrontMetaRichDescriptionField.value
    : '';
  return (
    <div className={clsx('pointer-events-auto z-10', 'mx-5 md:mx-0')}>
      {/* Sold out */}
      {/* {!availableForSale && (
        <div className="mb-3 text-xs font-bold uppercase text-darkGray">
          Sold out
        </div>
      )} */}

      {/* Sale */}
      {/* {availableForSale && selectedVariant?.compareAtPriceV2 && (
        <div className="mb-3 text-xs font-bold uppercase text-red">Sale</div>
      )} */}
      {/* Title */}
      {sanityProduct.richTitle && (
        <PortableText
          blocks={sanityProduct.richTitle}
          className="product-information__title mt-13 text-2xl"
        />
      )}

      {!sanityProduct.richTitle && storefrontMetaRichTitle && (
        <h1 className="product-information__title mt-13 font-plantin text-2xl">
          <span
            dangerouslySetInnerHTML={{__html: storefrontMetaRichTitle}}
          ></span>
        </h1>
      )}

      {!sanityProduct.richTitle &&
        !storefrontMetaRichTitle &&
        storefrontProduct?.title && (
          <h1 className="product-information__title mt-13 font-plantin text-2xl">
            {storefrontProduct.title}
          </h1>
        )}

      {yotpoBottomLine && <ProductRatings yotpoBottomLine={yotpoBottomLine} />}

      {/* Description */}
      {sanityProduct.richDescription && (
        <PortableText
          blocks={sanityProduct.richDescription}
          className="mt-10 font-plantin"
        />
      )}

      {!sanityProduct.richDescription && storefrontMetaRichDescription && (
        <p className="mt-10 font-plantin">{storefrontMetaRichDescription}</p>
      )}

      {/* Prices */}
      <ProductPrices storefrontProduct={storefrontProduct} />

      {/* Product options */}
      {multipleProductOptions && (
        <ProductOptions
          customProductOptions={sanityProduct.customProductOptions}
        />
      )}

      {/* Product actions */}
      <div className="mt-4 flex flex-col space-y-2">
        <AddToCartButton
          className={clsx([
            'product-information__cta bg-black font-nhaasMd text-white',
            selectedVariant.availableForSale && selectedOptions?.Size
              ? ''
              : 'out-of-stock',
          ])}
          variantId={selectedVariant?.id}
        >
          {selectedVariant.availableForSale
            ? selectedOptions?.Size
              ? 'Add to bag'
              : 'Select size'
            : 'Out of stock'}
        </AddToCartButton>
      </div>
    </div>
  );
}
