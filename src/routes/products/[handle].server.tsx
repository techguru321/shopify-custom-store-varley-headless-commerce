import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import groq from 'groq';
// import useBreadcrumbs from 'use-react-router-breadcrumbs';
import Layout from '../../components/global/Layout.server';
import NotFound from '../../components/global/NotFound.server';
import {PRODUCT_PAGE} from '../../fragments/sanity/pages/product';
import {PRODUCT_FIELDS} from '../../fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from '../../fragments/shopify/productVariant';
import useSanityQuery from '../../hooks/useSanityQuery';
import type {ProductWithNodes, SanityProductPage} from '../../types';

import ProductPageWrapper from '../../components/product/PageWrapper.client';
import PortableText from '../../components/portableText/PortableText.server';
import clsx from 'clsx';

type ShopifyPayload = {
  product: Pick<
    Product,
    | 'handle'
    | 'id'
    | 'media'
    | 'options'
    | 'seo'
    | 'title'
    | 'variants'
    | 'vendor'
  >;
};

export default function ProductRoute({params, request}) {
  const {handle} = useRouteParams();
  // Fetch Sanity document
  const {data: sanityProduct} = useSanityQuery<SanityProductPage>({
    params: {slug: handle},
    query: QUERY_SANITY,
  });

  // Conditionally fetch Shopify document
  let storefrontProduct: ProductWithNodes | null = null;
  if (sanityProduct?.gid) {
    const {
      language: {isoCode: languageCode},
      country: {isoCode: countryCode},
    } = useLocalization();

    const {
      data: {product},
    } = useShopQuery<ShopifyPayload>({
      query: QUERY_SHOPIFY,
      variables: {
        country: countryCode,
        id: sanityProduct.gid,
        language: languageCode,
      },
    });
    storefrontProduct = product;
  }

  // Shopify analytics
  useServerAnalytics(
    storefrontProduct
      ? {
          shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.product,
            resourceId: storefrontProduct.id,
          },
        }
      : null,
  );

  if (!sanityProduct || !storefrontProduct) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  // const breadcrumbs = useBreadcrumbs();

  const sanitySeo = sanityProduct.seo;

  const initialVariant = storefrontProduct.variants.nodes[0];

  const breadcrubsUrl = request.normalizedUrl;

  return (
    <Layout>
      <ProductPageWrapper
        sanityProduct={sanityProduct}
        storefrontProduct={storefrontProduct}
        initialVariantId={initialVariant?.id}
        breadcrumbsUrl={breadcrubsUrl}
      />
      <div
        className={clsx(
          'w-full', //
          '',
        )}
      >
        {/* Body */}
        {sanityProduct?.body && (
          <PortableText
            blocks={sanityProduct.body}
            className={clsx(
              'px-8', //
              '',
            )}
            colorTheme={sanityProduct?.colorTheme}
          />
        )}
      </div>
      {/* <RelatedProducts
        colorTheme={sanityProduct?.colorTheme}
        storefrontProduct={storefrontProduct}
      /> */}

      <Seo
        data={{
          ...(sanitySeo.image
            ? {
                featuredImage: {
                  height: sanitySeo.image.height,
                  url: sanitySeo.image.url,
                  width: sanitySeo.image.width,
                },
              }
            : {}),
          seo: {
            description: sanitySeo.description,
            title: sanitySeo.title,
          },
        }}
        type="product"
      />
    </Layout>
  );
}

const QUERY_SANITY = groq`
  *[
    _type == 'product'
    && store.slug.current == $slug
  ][0]{
    ${PRODUCT_PAGE}
  }
`;

const QUERY_SHOPIFY = gql`
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query product($country: CountryCode, $id: ID!, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    product: product(id: $id) {
      ...ProductFields
      media(first: 250) {
        nodes {
          ... on MediaImage {
            id
            image {
              altText
              height
              id
              url
              width
            }
            mediaContentType
          }
        }
      }
      metafields	(
        identifiers: [
          {namespace: "custom_fields", key: "rich_title"}
          {namespace: "custom_fields", key: "rich_description"}
          {namespace: "custom_fields", key: "breadcrumbs_collection"}
        ]
      ) {
        key
        namespace
        value
      }
      variants(first: 250) {
        nodes {
          ...ProductVariantFields
        }
      }
    }
  }
`;
