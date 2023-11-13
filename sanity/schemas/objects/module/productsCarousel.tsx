import {PackageIcon} from '@sanity/icons'
import React from 'react'
import ShopifyDocumentStatus from '../../../components/media/ShopifyDocumentStatus'

export default {
  name: 'module.productsCarousel',
  title: 'Products Carousel',
  type: 'object',
  icon: PackageIcon,
  fields: [
    {
      name: "carouselOptions",
      type: "module.carouselOptions",
    },
    {
      name: 'heading',
      type: 'simpleBlockContent',
      title: 'Heading'
    },
    {
      type: 'array',
      name: 'products',
      title: 'Product variants with images',
      of: [
        {
          type: 'object',
          name: 'productwithimage',
          fields: [
            {type: 'productWithVariant', name: 'productvariant'},
            {type: 'image', name: 'featuredimage'},
            {type: 'image', name: 'hoverImage'}
          ],
          preview: {
            // select: {
            //   product: 'productWithVariant'
            // },
            // prepare(selection) {
            //   const product = selection;
            //   console.log(product);
            // }
          }
        }
      ]
    }
  ]
}
