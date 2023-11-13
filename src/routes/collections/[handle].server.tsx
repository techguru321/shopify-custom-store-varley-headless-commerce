// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useServerAnalytics,
  useShopQuery,
  flattenConnection,
  type HydrogenRouteProps,
} from '@shopify/hydrogen';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';
import groq from 'groq';
import {useMemo} from 'react';
import LoadMoreProducts from '../../components/collection/LoadMoreProducts.client';
import SortOrderSelect from '../../components/collection/SortOrderSelect.client';
import Layout from '../../components/global/Layout.server';
import NotFound from '../../components/global/NotFound.server';
import CollectionHero from '../../components/heroes/Collection.server';
import ModuleGrid from '../../components/modules/ModuleGrid.server';
import {COLLECTION_PAGE_SIZE} from '../../constants';
import {COLLECTION_PAGE} from '../../fragments/sanity/pages/collection';
import {PRODUCT_FIELDS} from '../../fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from '../../fragments/shopify/productVariant';
import useSanityQuery from '../../hooks/useSanityQuery';
import type {SanityCollectionPage, SanitySettings, SanityShoppingNote} from '../../types';
import {combineProductsAndModules} from '../../utils/combineProductsAndModules';
import EmblaCarousel from '../../components/global/EmblaCarousel.server';
import Breadcrumb from '../../components/global/Breadcrumbs.client';
import Filters from '../../components/collection/Filters.client';

type Props = {
  collectionProductCount: number;
  params: HydrogenRouteProps;
  productSort?: {
    key?: string;
    reverse?: boolean;
  };
  filter: {
    open: string;
    items: {
      color: string[];
      size: string[];
      style: string[];
    };
  }
  selectedVariantID?: string;
  request: any;
};

type ShopifyPayload = {
  collection: Collection;
};

export default function CollectionRoute({
  collectionProductCount = COLLECTION_PAGE_SIZE,
  params,
  productSort,
  filter,
  selectedVariantID = '',
  request,
}: Props) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();
  const {
    data: {
      customColorCategories,
      customProductOptions,
      shoppingNotes
    }
  } = useSanityQuery<SanitySettings>({
    query: QUERY_SANITY_SETTINGS,
  });
  const productFilters = [{
    available: true
  }];

  if (filter) {
    filter.items.color.forEach((item) => {
      const customColorCategory = customColorCategories.find((colorCategory: SanityCustomColorCategory) => colorCategory.categoryName === item);
      const customColors = customColorCategory.categoryContent.split(',');
      customColors.forEach((color: string) => {
        const filterOption = {
          variantOption: {
            name: "color",
            value: color
          }
        };
        productFilters.push(filterOption);
      });
    });
    filter.items.size.forEach((item) => {
      const filterOption = {
        variantOption: {
          name: "size",
          value: item
        }  
      };
      productFilters.push(filterOption); 
    });
    filter.items.style.forEach((item) => {
      const filterOption = {
        productType: item
      };
      productFilters.push(filterOption); 
    });
  }
  const {handle} = params;
  const {data} = useShopQuery<ShopifyPayload>({
    query: QUERY_SHOPIFY,
    variables: {
      handle,
      country: countryCode,
      language: languageCode,
      numProducts: collectionProductCount,
      productSortKey: productSort?.key,
      productSortReverse: productSort?.reverse,
      filter: productFilters
    },
    preload: true,
  });
  // Shopify analytics
  useServerAnalytics(
    data?.collection
      ? {
          shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.collection,
            resourceId: data.collection.id,
          },
        }
      : null,
  );

  const {data: sanityCollection} = useSanityQuery<SanityCollectionPage>({
    params: {slug: handle},
    query: QUERY_SANITY,
  });
  if (data?.collection == null || !sanityCollection) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }
  const modules = sanityCollection?.modules;
  let VModule;
  if (modules) {
    VModule = modules.find(module => module._type === 'module.variantsOrder');
  }
  const variantsOrder = VModule?.variantsOrder ?? '';
  
  const sanitySeo = sanityCollection.seo;
  const collection = data.collection;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let products: any[] = [];
  if (variantsOrder) {
    variantsOrder.forEach(item => {
      products.push(item.productWithVariant.product);
    });
  } else {
    products = flattenConnection(collection.products);
  }
  const filters = collection.products.filters;
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;
  const carouselItems = sanityCollection?.heroCarousel?.collectionArray;

  const items = useMemo(() => {
    // Create combined list of both products and modules, with modules inserted at regular intervals
    return combineProductsAndModules({
      products,
    });
  }, [products]);


  return (
    <Layout>
      {/* breadcrumb */}
      <div
        className={clsx([
          'mx-auto max-w-[1558px]  px-[30px] py-5 md:px-8',
          filter && filter.open === 'all' ? 'hidden' : '',
        ])}
      >
        <Breadcrumb url={request.normalizedUrl} />
      </div>
      {/* Hero */}
      <div
        className={clsx([
          'mx-auto max-w-[1558px]  px-[30px] md:px-8 space-y-[60px]',
          filter && filter.open === 'all' ? 'hidden' : '',
        ])}
      >
        <CollectionHero
          colorTheme={sanityCollection.colorTheme}
          storefront={collection}
          hero={sanityCollection.hero}
        />
        {carouselItems && (
          <EmblaCarousel
            type={sanityCollection._type}
            slides={carouselItems}
            options={sanityCollection.heroCarousel.carouselOptions}
            mobileType="button"
            contentWidth="w-full"
          />
        )}
      </div>

      {/* Product List */}
      <div
        className={clsx(
          'mx-auto max-w-[1558px]  sm:px-[30px]',
          filter && filter.open === 'all' ? '' : 'mt-8',
        )}
      >
        {products.length > 0 && (
          <div
            className={clsx(
              'flex items-center space-x-1 px-6', //
              'sticky top-[81px] z-10 bg-white md:relative md:top-0 md:border-b md:px-0 md:pt-3 md:pb-4',
              filter && filter.open === 'all' ? '' : 'mb-3 md:mb-7',
            )}
          >
            <Filters
              customColorCategories={customColorCategories}
              filters={filters}
            />
            <div className="order-2 basis-full sm:order-none" />
            <span className="order-3 whitespace-nowrap font-nhaasReg text-sm sm:order-none">
              {variantsOrder ? variantsOrder.length : products.length} Results
            </span>
            <SortOrderSelect
              key={sanityCollection._id}
              initialSortOrder={sanityCollection.sortOrder}
            />
          </div>
        )}
        {/* No results */}
        {products.length === 0 && (
          <div className="mt-16 text-center text-lg text-darkGray">
            No products.
          </div>
        )}
        <div className='flex'>
          <div className={clsx(['grow', filter && filter.open === 'all' ? 'hidden' : ''])}>
            <ModuleGrid
              colorTheme={sanityCollection.colorTheme}
              customProductOptionColors={customProductOptions[0].colors}
              items={modules ? modules : items}
              displayCount={collectionProductCount}
              selectedVariantID={selectedVariantID}
            />
            {(
              ( !modules && hasNextPage ) || 
              ( modules && variantsOrder.length > collectionProductCount ) 
            ) && (
              <LoadMoreProducts startingCount={collectionProductCount} />
            )}
          </div>
        </div>
      </div>
      
      {/* shopping notes */}
      {shoppingNotes && (
        <div
          className={clsx([
            'flex justify-center flex-col md:flex-row',
            'mx-auto max-w-[1558px]  px-[30px] md:px-8 pt-30 md:pb-20 pb-15',
            filter && filter.open === 'all' ? 'hidden' : '',
          ])}
        >
          {shoppingNotes.map((shoppingNote: SanityShoppingNote)=> {
            return (
              <div key={shoppingNote._key} className="px-[30px] py-10 md:py-0 md:px-10 max-w-[350px] text-center">
                <div key={`${shoppingNote._key}_title`} className="mb-2 font-plantinItalic text-[24px] block">
                  {shoppingNote.title}
                </div>
                <div key={`${shoppingNote._key}_content`} className="font-nhaasReg text-sm block text-[#5b5d62]">
                  {shoppingNote.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* seo */}
      <Seo
        data={{
          ...(sanitySeo.image
            ? {
                image: {
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
        type="collection"
      />
    </Layout>
  );
}

const QUERY_SANITY_SETTINGS = groq`
  *[_type == 'settings'][0] {
    customProductOptions,
    customColorCategories,
    shoppingNotes
  }
`;

const QUERY_SANITY = groq`
  *[
    _type == 'collection'
    && store.slug.current == $slug
  ][0]{
    ${COLLECTION_PAGE}
  }
`;

const QUERY_SHOPIFY = gql`
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $numProducts: Int!
    $productSortKey: ProductCollectionSortKeys
    $productSortReverse: Boolean
    $filter: [ProductFilter!]
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      image {
        altText
        height
        id
        url
        width
      }
      products(
        first: $numProducts
        reverse: $productSortReverse
        sortKey: $productSortKey
        filters: $filter
      ) {
        edges {
          node {
            ...ProductFields
            metafields	(
              identifiers: [
                {
                  namespace: "custom_fields"
                  key: "rich_title"  
                }
                {
                  namespace: "custom_fields"
                  key: "rich_description"
                }
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
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        pageInfo {
          hasNextPage
        }
      }
      title
      description
    }
  }
`;
