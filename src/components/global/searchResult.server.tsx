import {flattenConnection, gql, useShopQuery} from '@shopify/hydrogen';
import clsx from 'clsx';
import groq from 'groq';
import {useMemo} from 'react';
import {COLLECTION_PAGE_SIZE} from '../../constants';
import {PRODUCT_FIELDS} from '../../fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from '../../fragments/shopify/productVariant';
import useSanityQuery from '../../hooks/useSanityQuery';
import {combineProductsAndModules} from '../../utils/combineProductsAndModules';
import LoadMoreProducts from '../collection/LoadMoreProducts.client';
import ModuleGrid from '../modules/ModuleGrid.server';
import Layout from './Layout.server';

type props = {
  search: string;
  selectedVariantID?: string;
};

export default function SearchResultRoute({
  search,
  selectedVariantID = '',
}: props) {
  const term = search.replace('?q=', '');

  const QUERY_SHOPIFY = gql`
    ${PRODUCT_FIELDS}
    ${PRODUCT_VARIANT_FIELDS}
    query SearchDetails(
      $numProducts: Int!
    ) {
      products(first: $numProducts, query: "title:*${term}*") {
        edges {
          node {
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
    }`;
  const QUERY_SANITY_SETTINGS = groq`
  *[_type == 'settings'][0] {
    customProductOptions,
    customColorCategories,
    shoppingNotes
  }`;
  const {data} = useShopQuery({
    query: QUERY_SHOPIFY,
    variables: {
      numProducts: COLLECTION_PAGE_SIZE,
    },
    preload: true,
  });
  const {
    data: {customColorCategories, customProductOptions, shoppingNotes},
  } = useSanityQuery<SanitySettings>({
    query: QUERY_SANITY_SETTINGS,
  });

  const hasNextPage = data.products.pageInfo.hasNextPage;
  const products = flattenConnection(data.products);
  const items = useMemo(() => {
    return combineProductsAndModules({
      products,
    });
  }, [products]);

  return (
    <Layout>
      <div className=" my-5 mx-auto h-[35px] w-full sm:w-[405px]">
        <form
          action="/search"
          method="get"
          className="flex h-full w-full items-center border-b"
          autoComplete="off"
        >
          <input
            type="text"
            name="q"
            className="h-full w-full font-nhaasMd focus-visible:outline-none"
            placeholder="Search"
            autoComplete="off"
            value={term}
          />
          <button className="h-[21px] w-[25px]" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42.128"
              height="12.708"
              viewBox="0 0 42.128 12.708"
              className="h-full w-full stroke-2"
            >
              <g transform="translate(-136.982 -892.226)">
                <path
                  d="M0-5.362V36.025"
                  transform="translate(142.344 898.534) rotate(-90)"
                  fill="none"
                  stroke="#000"
                ></path>
                <path
                  d="M1099.524,643.151l6.177,6.177,6.177-6.177"
                  transform="translate(-470.571 2004.282) rotate(-90)"
                  fill="none"
                  stroke="#000"
                ></path>
              </g>
            </svg>
          </button>
        </form>
      </div>
      <div className={clsx('mx-auto max-w-[1558px]  pt-5 sm:px-[30px]')}>
        <div className="mt-5 mb-4 w-full border-b border-b-[#EEEEEE] pb-3">
          <span className="font-nhaasMd">Search results:</span>&nbsp;&nbsp;
          <span className="font-nhaasReg">{term}</span>
        </div>
        <div className="flex flex-col">
          <ModuleGrid
            customProductOptionColors={customProductOptions[0].colors}
            items={items}
            displayCount={COLLECTION_PAGE_SIZE}
            selectedVariantID={selectedVariantID}
          />
          {hasNextPage && (
            <LoadMoreProducts startingCount={COLLECTION_PAGE_SIZE} />
          )}
        </div>
      </div>
    </Layout>
  );
}
