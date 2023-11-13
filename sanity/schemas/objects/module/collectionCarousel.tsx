import {PackageIcon} from '@sanity/icons'
import React from 'react'
import ShopifyDocumentStatus from '../../../components/media/ShopifyDocumentStatus'

export default {
  name: 'module.collectionCarousel',
  title: 'Collection Carousel',
  type: 'object',
  icon: PackageIcon,
  fields: [
    {
      name: "carouselOptions",
      type: "module.carouselOptions",
    },
    {
      name: "heading",
      type: "module.heading",
    },
    // Collection
    {
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      weak: true,
      to: [{type: 'collection'}],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      collectionTitle: 'collection.store.title',
      imageUrl: 'collection.store.imageUrl',
      isDeleted: 'collection.store.isDeleted',
    },
    prepare(selection) {
      const {collectionTitle, imageUrl, isDeleted} = selection
      return {
        media: <ShopifyDocumentStatus isDeleted={isDeleted} type="collection" url={imageUrl} />,
        subtitle: 'Collection',
        title: collectionTitle,
      }
    },
  },
}
