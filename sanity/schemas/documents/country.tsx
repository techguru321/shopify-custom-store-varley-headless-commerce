import {EarthAmericasIcon} from '@sanity/icons'

export default {
    name: 'document.country',
    title: 'Country',
    type: 'document',
    icon: EarthAmericasIcon,
    fields: [
      // Image
      {
        name: 'flag',
        title: 'Country Flag',
        type: 'image',
        description: 'Country Flag (required)',
        options: {
          accept: 'image/svg+xml',
        },
        validation: (Rule) =>
          Rule.custom((image) => {
            if (!image) {
              return "Flag image is required field."
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
        title: 'Country Name',
        type: 'string',
        validation: Rule => Rule.required().min(2)
      },
      {
        name: 'currency',
        title: 'Currency',
        type: 'string',
        varlidation: Rule => Rule.required().min(1)
      },
      {
        title: 'Link',
        name: 'href',
        type: 'url',
        validation: Rule => Rule.uri({
          scheme: ['http', 'https']
        })
      }
    ],
    preview: {
        select: {
            image: 'flag',
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