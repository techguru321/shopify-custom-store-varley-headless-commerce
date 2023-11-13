import {gql, useShopQuery} from '@shopify/hydrogen';
import groq from 'groq';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_FIELDS} from '../../fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from '../../fragments/shopify/productVariant';
import useSanityQuery from '../../hooks/useSanityQuery';
import type {SanityModuleCollectionCarousel} from '../../types';
import EmblaCarousel from '../global/EmblaCarousel.server';
import PortableText from '../portableText/PortableText.server';

type Props = {
  module?: SanityModuleCollectionCarousel;
};

type ShopifyPayload = {
  collection: Partial<Collection>;
};

export default function ProductsCarouselModule({module}: Props) {
  const key = module?._key;
  const {data: carousel} = useSanityQuery({
    query: QUERY_SANITY_SETTINGS,
    params: {
      key,
    },
  });
  
  const slides = [];
  carousel?.[0]?.products.forEach(productwithimage => {
    const handle = productwithimage.productvariant.product.store.slug.current;
    const variantID = productwithimage.productvariant.variant
      ? productwithimage.productvariant.variant.store.gid
      : undefined;
    const {data} = useShopQuery<ShopifyPayload>({
      query: QUERY_SHOPIFY,
      variables: {
        handle,
      },
      preload: true,
    });
    slides.push({
      _type: 'module.productwithimage',
      product: data.product,
      variant_id: variantID,
      featuredImage: productwithimage.featuredImage,
      hoverImage: productwithimage.hoverImage
    });
  }); 

  return (
    <div className="mx-auto  max-w-[1558px] text-center md:mb-30">
      <PortableText
        className="font-plantin"
        blocks={carousel?.[0]?.heading[0]}
      />
      {/* <pre>{JSON.stringify(slides)}</pre> */}
      {carousel && (
        <EmblaCarousel
          slides={slides}
          options={carousel?.[0]?.carouselOptions}
          type={carousel?.[0]?._type}
          mobileType={undefined}
          contentWidth="w-full"
        />
      )}
    </div>
  );
}

const QUERY_SANITY_SETTINGS = groq`
*[_type == 'home'].modules[_key == $key] {
  _key,
  _type,
  heading[] {
    ...
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
  },
  products[] {
    _key,
    _type,
    "featuredImage": featuredimage.asset->url,
    "hoverImage": hoverImage.asset->url,
    productvariant {
      "product": product->,
      "variant": variant->
    }
  }
}
`;

const QUERY_SHOPIFY = gql`
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query ProductDetails($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
      metafields	(
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