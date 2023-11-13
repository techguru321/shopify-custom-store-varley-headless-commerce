import {Image, Link} from '@shopify/hydrogen';
import {ProductWithNodes} from '../../types';
import MoneyPrice from '../product/money/Price.client';
import MoneyCompareAtPrice from '../product/money/CompareAtPrice.client';
import useHover from '../../hooks/useHover';

/* A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
type props = {
  storefrontProduct: ProductWithNodes;
  selectedVariantID?: string;
  featuredImage?: string;
  hoverImage?: string;
};
export default function ProductCard({
  storefrontProduct,
  selectedVariantID = undefined,
  featuredImage = undefined,
  hoverImage = undefined,
}: props) {
  const selectedVariant = !selectedVariantID
    ? storefrontProduct?.variants.nodes[0]
    : storefrontProduct?.variants.nodes.find(
        (variant) => variant.id === selectedVariantID,
      );

  if (selectedVariant == null) {
    return null;
  }

  const richTitle = storefrontProduct?.metafields?.[0]?.value;
  let title;
  if (richTitle) {
    title = (
      <>
        <span dangerouslySetInnerHTML={{__html: richTitle}}></span>
      </>
    );
  } else {
    title = (
      <>
        <span>
          {storefrontProduct?.title?.split('-')[0]}{' '}
          <i>{storefrontProduct?.title?.split('-')[1]}</i>
        </span>
      </>
    );
  }

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div className="relative mb-4 flex flex-col items-center text-md">
      <Link
        to={`/products/${storefrontProduct.handle}`}
        prefetch={false}
        className={`block h-full w-full`}
      >
        {featuredImage && (
          // eslint-disable-next-line hydrogen/prefer-image-component, jsx-a11y/alt-text
          <img
            src={
              hoverImage
                ? !isHovered
                  ? featuredImage
                  : hoverImage
                : featuredImage
            }
            className="aspect-[10/13] h-full w-full object-cover"
            ref={hoverRef}
          />
        )}
        {!featuredImage && selectedVariant.image ? (
          <Image
            className="aspect-[10/13] h-full w-full object-cover"
            data={selectedVariant.image}
          />
        ) : null}
        {!selectedVariant?.availableForSale && (
          <div className="rounded-3xl absolute top-3 left-3 text-xs text-white">
            Out of stock
          </div>
        )}
      </Link>
      <Link
        className="pt-4 text-xl font-normal"
        to={`/products/${storefrontProduct?.handle}`}
      >
        <span className="font-plantin text-xl text-black">{title}</span>
      </Link>

      <div className="flex font-nhaasReg text-md">
        {selectedVariant.compareAtPrice && (
          <span className="text-darkGray">
            <MoneyCompareAtPrice money={selectedVariant.compareAtPrice} />
          </span>
        )}
        <MoneyPrice money={selectedVariant.priceV2} />
      </div>
    </div>
  );
}
