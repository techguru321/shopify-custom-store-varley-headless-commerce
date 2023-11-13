import clsx from 'clsx';
import type {
  ProductWithNodes,
  SanityColorTheme,
  SanityCustomProductOptionColor,
  SanityModule,
} from '../../types';
import Module from './Module.server';
import ProductCard from '../product/Card.server';
import {gql, useShopQuery} from '@shopify/hydrogen';
import {PRODUCT_FIELDS} from '../../fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from '../../fragments/shopify/productVariant';
import {Product} from '@shopify/hydrogen/storefront-api-types';

// Sanity modules to render in full width (across all grid columns)
const FULL_WIDTH_MODULE_TYPES: SanityModule['_type'][] = [
  'module.accordion',
  'module.callout',
  'module.callToAction',
  'module.collectionCarousel',
  'module.collectionListingCarousel',
  'module.mediaObject',
  'module.stockists',
  'module.people',
  'module.switchboard',
  'module.tabs',
  'module.#inVarley',
  'module.benefit',
  'module.postImages',
  'module.scrollToSection',
  'module.variantsOrder',
  'module.productsCarousel',
];

// Tailwind class map
const CLASSES = {
  flexAlign: {
    center: 'items-center',
    end: 'items-end',
    start: 'items-start',
  },
  flexJustify: {
    center: 'justify-center',
    end: 'justify-end',
    start: 'justify-start',
  },
  imageAspect: {
    landscape: 'aspect-square md:aspect-[16/9]',
    square: 'aspect-square',
    portrait: 'aspect-[307/408]',
  },
  width: {
    sm: 'w-full md:w-[55%]',
    md: 'w-full md:w-[65%]',
    lg: 'w-full md:w-full',
  },
};

// Layout rules for grid children.
// Each child iterates (and loops) through this array of rules.
// These layout rules only apply to both product modules and non-module products.
const PRODUCT_LAYOUT = [
  {
    aspect: 'portrait',
    flex: {align: 'start', justify: 'start'},
    offsetY: false,
    width: 'md',
  },
  {
    aspect: 'portrait',
    flex: {align: 'start', justify: 'end'},
    offsetY: false,
    width: 'lg',
  },
  {
    aspect: 'portrait',
    flex: {align: 'start', justify: 'start'},
    offsetY: false,
    width: 'lg',
  },
  {
    aspect: 'portrait',
    flex: {align: 'center', justify: 'start'},
    offsetY: false,
    width: 'sm',
  },
  {
    aspect: 'portrait',
    flex: {align: 'start', justify: 'end'},
    offsetY: false,
    width: 'md',
  },
  {
    aspect: 'portrait',
    flex: {align: 'start', justify: 'end'},
    offsetY: true,
    width: 'md',
  },
  {
    aspect: 'portrait',
    flex: {align: 'start', justify: 'start'},
    offsetY: false,
    width: 'lg',
  },
  {
    aspect: 'portrait',
    flex: {align: 'center', justify: 'end'},
    offsetY: false,
    width: 'lg',
  },
] as const;

type ShopifyPayload = {
  product: Product;
};

type Props = {
  colorTheme?: SanityColorTheme;
  items: (SanityModule | ProductWithNodes)[];
  customProductOptionColors: SanityCustomProductOptionColor[];
  displayCount?: number;
  selectedVariantID?: string;
};

export default function ModuleGrid({
  colorTheme,
  items,
  customProductOptionColors,
  displayCount = 0,
  selectedVariantID = '',
}: Props) {
  return (
    <ul
      className="
    grid grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4"
    >
      {items.map((item, index) => {
        const productLayout = PRODUCT_LAYOUT[index % PRODUCT_LAYOUT.length];
        const productImageAspect = CLASSES.imageAspect[productLayout.aspect];
        const productWidth = CLASSES.width[productLayout.width];
        const productLayoutClasses = clsx([
          CLASSES.flexAlign[productLayout.flex.align],
          CLASSES.flexJustify[productLayout.flex.justify],
          productLayout.offsetY ? 'md:mt-[5vw]' : 'mt-0',
        ]);

        if (isModule(item)) {
          const isProductModule = item._type === 'module.product';
          if (item._type === 'module.variantsOrder') {
            const returnValues: any[] = [];
            item.variantsOrder.forEach((variantOrder, idx) => {
              if (idx < displayCount) {
                const handle =
                  variantOrder.productWithVariant.product.store.slug.current;
                const variant_id =
                  variantOrder.productWithVariant.variant.store.gid;
                const {data} = useShopQuery<ShopifyPayload>({
                  query: QUERY_SHOPIFY,
                  variables: {
                    handle,
                  },
                  preload: true,
                });

                returnValues.push(
                  <li
                    key={data.product.id}
                    className="px-[3px] pb-[40px] md:px-[10px] md:pb-[40px]"
                  >
                    <div>
                      <ProductCard
                        imageAspectClassName={productImageAspect}
                        customProductOptionColors={customProductOptionColors}
                        storefrontProduct={data.product}
                        initialVariantID={variant_id}
                        selectedVariantID={selectedVariantID}
                      />
                    </div>
                  </li>,
                );
              }
            });
            return returnValues.map((returnValue) => {
              return returnValue;
            });
          } else {
            // Render modules
            return (
              <li
                className={clsx([
                  'flex pb-[40px] md:px-[10px] md:pb-[40px]',
                  isProductModule
                    ? productLayoutClasses
                    : 'items-center justify-center',
                  FULL_WIDTH_MODULE_TYPES.includes(item._type)
                    ? 'col-span-4'
                    : '',
                ])}
                key={item._key}
              >
                <div
                  className={clsx(isProductModule ? productWidth : 'w-full')}
                >
                  <Module
                    colorTheme={colorTheme}
                    imageAspectClassName={productImageAspect}
                    module={item}
                  />
                </div>
              </li>
            );
          }
        } else {
          // Render product cards
          return (
            <li
              key={item.id}
              className="px-[3px] pb-[40px] md:px-[10px] md:pb-[40px]"
            >
              <div key={item.variants.nodes[0].id}>
                <ProductCard
                  imageAspectClassName={productImageAspect}
                  customProductOptionColors={customProductOptionColors}
                  storefrontProduct={item}
                  selectedVariantID={selectedVariantID}
                />
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
}

const isModule = (
  item: SanityModule | ProductWithNodes,
): item is SanityModule => {
  return (item as SanityModule)._type?.startsWith('module');
};

const QUERY_SHOPIFY = gql`
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query ProductDetails($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
      metafields(
        identifiers: [
          {namespace: "custom_fields", key: "rich_title"}
          {namespace: "custom_fields", key: "rich_description"}
        ]
      ) {
        key
        namespace
        value
      }
      variants(first: 100) {
        nodes {
          ...ProductVariantFields
        }
      }
    }
  }
`;
