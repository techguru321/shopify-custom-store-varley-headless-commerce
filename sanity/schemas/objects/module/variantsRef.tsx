import React from 'react'
import ShopifyDocumentStatus from '../../../components/media/ShopifyDocumentStatus'

export default {
    name: "module.variantsReference",
    type: "object",
    title: "Variants reference",
    fields: [
        {
            name: 'productWithVariant',
            title: 'Product + Variant',
            type: 'productWithVariant',
            validation: (Rule) => Rule.required(),
          },
    ],
    preview: {
        select: {
          isDeleted: 'productWithVariant.product.store.isDeleted',
          previewImageUrl: 'productWithVariant.variant.store.previewImageUrl',
          status: 'productWithVariant.product.store.status',
          title: 'productWithVariant.variant.store.title',
          subtitle: 'productWithVariant.product.store.title'
        },
        prepare(selection) {
          const {isDeleted, previewImageUrl, status, title, subtitle} = selection
          return {
            media: (
              <ShopifyDocumentStatus
                isActive={status === 'active'}
                isDeleted={isDeleted}
                type="variant"
                url={previewImageUrl}
              />
            ),
            subtitle,
            title,
          }
        },
      },
};