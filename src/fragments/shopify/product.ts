import {gql} from '@shopify/hydrogen';

export const PRODUCT_FIELDS = gql`
  fragment ProductFields on Product {
    handle
    id
    tags
    availableForSale
    options {
      name
      values
    }
    title
    vendor
    images(first: 100) {
      nodes {
        altText
        id
        url
      }
    }
  }
`;
