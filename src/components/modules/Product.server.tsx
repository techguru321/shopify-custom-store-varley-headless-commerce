import {gql, useLocalization, useShopQuery} from '@shopify/hydrogen';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import groq from 'groq';
import {PRODUCT_FIELDS} from '../../fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from '../../fragments/shopify/productVariant';
import useSanityQuery from '../../hooks/useSanityQuery';
import type {ProductWithNodes, SanityCustomProductOption, SanityModuleProduct} from '../../types';
import ProductCard from '../product/Card.server';
import ProductPill from '../product/Pill';

type Props = {
  imageAspectClassName?: string;
  layout?: 'card' | 'pill';
  module?: SanityModuleProduct;
};

type ShopifyPayload = {
  product: Partial<Product>;
  productVariant: Partial<ProductVariant>;
};

export default function ProductModule({
  imageAspectClassName,
  layout = 'card',
  module,
}: Props) {
  const productGid = module?.productWithVariant.gid;
  const productVariantGid = module?.productWithVariant.variantGid;

  // Conditionally fetch Shopify document
  let storefrontProduct: ProductWithNodes | null = null;
  if (productGid && productVariantGid) {
    const {
      language: {isoCode: languageCode},
      country: {isoCode: countryCode},
    } = useLocalization();
    const {data} = useShopQuery<ShopifyPayload>({
      query: QUERY_SHOPIFY,
      variables: {
        country: countryCode,
        id: productGid,
        language: languageCode,
        variantId: productVariantGid,
      },
    });

    const {data: {customProductOptions}} = useSanityQuery<SanityCustomProductOption>({query: QUERY_SANITY_PRODUCT_OPTIONS});

    // Attach variant nodes
    storefrontProduct = {
      ...data.product,
      variants: {nodes: [data.productVariant as ProductVariant]},
    };
  }

  if (!storefrontProduct) {
    return null;
  }

  if (layout === 'pill') {
    return <ProductPill storefrontProduct={storefrontProduct} />;
  }

  if (layout === 'card') {
    return (
      <ProductCard
        customProductOptionColors={customProductOptions[0].colors}
        imageAspectClassName={imageAspectClassName}
        storefrontProduct={storefrontProduct}
      />
    );
  }

  return null;
}

const QUERY_SHOPIFY = gql`
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query product(
    $country: CountryCode
    $id: ID!
    $language: LanguageCode
    $variantId: ID!
  ) @inContext(country: $country, language: $language) {
    product: product(id: $id) {
      ...ProductFields
    }
    productVariant: node(id: $variantId) {
      ... on ProductVariant {
        ...ProductVariantFields
      }
    }
  }
`;

const QUERY_SANITY_PRODUCT_OPTIONS = groq`
  *[_type == 'settings'][0] {
    customProductOptions
  }
`;