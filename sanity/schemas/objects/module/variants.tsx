import {CopyIcon} from '@sanity/icons'


export default {
  name: 'module.variantsOrder',
  title: 'Variants Order',
  type: 'object',
  icon: CopyIcon,
  fields: [
      // Modules (Images)
      {
          name: "variantsOrder",
          title: "Variants",
          type: "array",
          of: [
            {
              type: "module.variantsReference",
            },
          ],
      }
  ],
  preview: {
    select: {
      title: 'title',
      variant0: 'variantsOrder.0.productWithVariant.variant.store.title', // <- variant.0 is a reference to variant, and the preview component will automatically resolve the reference and return the name
      variant1: 'variantsOrder.1.productWithVariant.variant.store.title',
      variant2: 'variantsOrder.2.productWithVariant.variant.store.title',
      variant3: 'variantsOrder.3.productWithVariant.variant.store.title',
      variant4: 'variantsOrder.4.productWithVariant.variant.store.title',
      variant5: 'variantsOrder.5.productWithVariant.variant.store.title'
    },
    prepare: ({title, variant0, variant1, variant2, variant3, variant4, variant5}) => {
        
      const variant = [variant0, variant1, variant2, variant3, variant4].filter(Boolean)
      const subtitle = variant.length > 0 ? `Variants: ${variant.join(', ')}` : ''
      const hasMorevariant = Boolean(variant5)
      return {
        title: hasMorevariant ? `${subtitle}…` : subtitle,
      }
    }
  }
}