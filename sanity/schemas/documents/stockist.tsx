import {PackageIcon} from '@sanity/icons'

export default {
    name: 'document.stockist',
    title: 'Stockist',
    type: 'document',
    icon: PackageIcon,
    fields: [
      // Image
      {
        name: 'vector',
        title: 'Vector artwork',
        type: 'image',
        description: 'Displayed in a grid on the About Us page',
        options: {
          accept: 'image/svg+xml',
        },
        validation: (Rule) =>
          Rule.custom((image) => {
            if (!image) {
              return true
            }
            const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/
            const format = image.asset._ref.match(pattern)[3]
            if (format !== 'svg') {
              return 'Image must be an SVG'
            }
            return true
          }),
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
    ],
    preview: {
        select: {
            image: 'vector',
            name: 'name',
        },
        prepare(selection) {
            const {image, name} = selection

            return {
                media: image,
                title: name,
            }
        },
    },
}