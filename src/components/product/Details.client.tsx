import {ProductOptionsProvider} from '@shopify/hydrogen';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';
import type {ProductWithNodes, SanityProductPage} from '../../types';
import ProductGallery from './Gallery.client';
import ProductWidget from './Widget.client';
import AccordionModule from '../modules/Accordion.client';

type Props = {
  initialVariantId?: ProductVariant['id'];
  sanityProduct: SanityProductPage;
  storefrontProduct: ProductWithNodes;
  yotpoBottomLine: any;
};

export default function ProductDetails({
  initialVariantId,
  sanityProduct,
  storefrontProduct,
  yotpoBottomLine,
}: Props) {
  return (
    <ProductOptionsProvider
      data={storefrontProduct}
      initialVariantId={initialVariantId}
    >
      {/* Gallery */}
      <ProductGallery
        storefrontProduct={storefrontProduct}
        className="flex-1 md:flex-2"
      />

      {/* Widget (mobile) */}
      <div className="mb-8 md:hidden">
        <ProductWidget
          sanityProduct={sanityProduct}
          storefrontProduct={storefrontProduct}
          yotpoBottomLine={yotpoBottomLine}
        />
      </div>

      {/* Widget (desktop) */}
      <div
        className={clsx(
          'sticky top-[158px] h-full flex-1',
          'hidden pr-[18px] md:block',
        )}
      >
        <div
          className={clsx(
            'ml-[40px] mr-[10px] max-w-[500px] 2xl:ml-[120px] 2xl:mr-[90px]',
          )}
        >
          <ProductWidget
            sanityProduct={sanityProduct}
            storefrontProduct={storefrontProduct}
            yotpoBottomLine={yotpoBottomLine}
          />
          <AccordionModule module={sanityProduct.accordion} />
        </div>
      </div>
    </ProductOptionsProvider>
  );
}
