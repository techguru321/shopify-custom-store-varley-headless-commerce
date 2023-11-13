import {PackageIcon} from '@sanity/icons'


export default {
  name: 'module.collectionListingCarousel',
  title: 'Collection Listing Carousel',
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
    // Collection
    {
        name: 'collectionArray',
        title: 'Collection Array',
        type: 'array',
        of: [
            {type: 'module.collectionCard'}
        ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      collectionArray0: 'collectionArray.0.person.name', // <- collectionArray.0 is a reference to collectionArray, and the preview component will automatically resolve the reference and return the name
      collectionArray1: 'collectionArray.1.person.name',
      collectionArray2: 'collectionArray.2.person.name',
      collectionArray3: 'collectionArray.3.person.name',
      collectionArray4: 'collectionArray.4.person.name',
      collectionArray5: 'collectionArray.5.person.name'
    },
    prepare: ({title, collectionArray0, collectionArray1, collectionArray2, collectionArray3, collectionArray4, collectionArray5}) => {
        
      const collectionArray = [collectionArray0, collectionArray1, collectionArray2, collectionArray3, collectionArray4].filter(Boolean)
      const subtitle = collectionArray.length > 0 ? `collectionArray: ${collectionArray.join(', ')}` : ''
      const hasMorecollectionArray = Boolean(collectionArray5)
      return {
        title: hasMorecollectionArray ? `Collection List Carousel ${subtitle}…` : `Collection List Carousel ${subtitle}`,
      }
    }
  }
}
