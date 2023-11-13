import {StarIcon} from '@sanity/icons'

export default {
    name: 'document.usp',
    title: 'USP',
    type: 'document',
    icon: StarIcon,
    fields: [
      // Image
      {
        name: 'vector',
        title: 'Vector artwork',
        type: 'image',
        description: 'Displayed in the features accordion on the PDP',
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