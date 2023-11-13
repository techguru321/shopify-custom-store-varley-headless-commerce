import groq from 'groq';
import {gql, useShopQuery} from '@shopify/hydrogen';
import {Collection} from '@shopify/hydrogen/storefront-api-types';

import useSanityQuery from './hooks/useSanityQuery';
import CollectionCardCarousel from './components/carousel/collectionCard.client';
import ProductCardCarousel from './components/carousel/productCard.client';
import {stringToSlug} from './utils/stringToSlug';
import {PRODUCT_FIELDS} from './fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from './fragments/shopify/productVariant';
import Layout from './components/global/Layout.server';

type ShopifyPayload = {
  collection: Partial<Collection>;
};

export default function CarouselRoute() {
  const key = 'a46d11b71ceb';
  const {data: carousel} = useSanityQuery({
    hydrogenQueryOptions: {preload: true},
    query: QUERY_SANITY,
    params: {key},
  });

  if (!carousel && carousel.length === 0) {
    return <div>No DATA</div>;
  }

  const {data} = useShopQuery<ShopifyPayload>({
    query: QUERY_SHOPIFY,
    variables: {
      handle: stringToSlug('New Arrivals'),
    },
  });

  if (data?.collection == null) {
    return <div>NO PRODUCTS</div>;
  }

  const collection = data.collection;
  const products = collection.products.nodes;

  return (
    <Layout>
      <CollectionCardCarousel carousel={carousel} />
      {/* <ProductCardCarousel products={products} /> */}
      {/* <pre>{JSON.stringify(carousel, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </Layout>
  );
}

const QUERY_SANITY = groq`
*[_type == 'home'].modules[_key == $key] {
  _type,
  heading {
    _type,
    heading[],
  },
  collectionArray[] {
    _key,
    _id,
    _type,
    collectionHeading{
      ...
    },
    image{
      asset{
        _ref
      }
    },
    reference->{
      store{
        gid,
        title,
        slug {
          current
        }
      }
    }
  },
  carouselOptions {
    _type,
    arrowColour {
      ...
    },
    breakpoint,
    arrowSize,
    autoplayDelay,
    autoplay,
    align,
    loop,
    fontSize,
    slidesToShow,
    aspectRatio,
    font,
    arrows,
    slideDots,
  }
}`;

const QUERY_SHOPIFY = gql`
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      image {
        altText
        height
        id
        url
        width
      }
      products(first: 10) {
        nodes {
          ...ProductFields
          variants(first: 1) {
            nodes {
              ...ProductVariantFields
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
      title
    }
  }
`;
