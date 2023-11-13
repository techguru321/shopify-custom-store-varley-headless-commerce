import {gql, useShopQuery} from '@shopify/hydrogen';
import groq from 'groq';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_FIELDS} from '../../fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from '../../fragments/shopify/productVariant';
import NotFound from '../../components/global/NotFound.server';
import useSanityQuery from '../../hooks/useSanityQuery';
import type {SanityModuleCollectionCarousel} from '../../types';
import {stringToSlug} from '../../utils/stringToSlug';
import EmblaCarousel from '../global/EmblaCarousel.server';
import Heading from '../global/Heading.server';

type Props = {
  module?: SanityModuleCollectionCarousel;
};

type ShopifyPayload = {
  collection: Partial<Collection>;
};

export default function CollectionCarouselModule({module}: Props) {
  const key = module?._key;
  const {data: carousel} = useSanityQuery({
    query: QUERY_SANITY_SETTINGS,
    params: {
      key,
    },
  });

  const col = module?.collection;

  if (!col?.gid || !col?.slug) {
    return null;
  }

  const {data} = useShopQuery<ShopifyPayload>({
    query: QUERY_SHOPIFY,
    variables: {
      handle: stringToSlug(col?.title),
    },
  });

  if (data?.collection == null) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  const collection = data.collection;
  const products = collection.products.nodes;

  return (
    <div className="mx-auto  max-w-[1558px] md:mb-30 text-center">
      <Heading item={carousel[0].heading} />
      {carousel && products && (
        <EmblaCarousel
          slides={products}
          options={carousel[0].carouselOptions}
          type={carousel[0]._type}
        />
      )}
    </div>
  );
}

const QUERY_SANITY_SETTINGS = groq`
*[_type == 'home'].modules[_key == $key] {
  heading {
    _type,
    heading[],
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
}
`;

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
      products(first: 8) {
        nodes {
          ...ProductFields
          metafields	(
            identifiers: [
              {
                namespace: "custom_fields"
                key: "rich_title"  
              }
            ]
          ) {
            key
            namespace
            value
          }
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
