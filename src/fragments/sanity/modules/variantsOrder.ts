import groq from 'groq';

export const MODULE_VARIANTSORDER = groq`
  variantsOrder[] {
    ...,
    productWithVariant {
      ...,
      product->,
      variant->
    }
  }
`;
