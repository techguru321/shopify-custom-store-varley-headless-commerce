import {EarthGlobeIcon} from '@sanity/icons'

export default {
    name: 'document.social',
    title: 'Social Accounts',
    type: 'document',
    icon: EarthGlobeIcon,
    fields: [
      // Image
      {
        name: 'vector',
        title: 'Vector artwork',
        type: 'image',
        description: 'Custom Social Icon (Optional)',
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
      {
        title: 'Link',
        name: 'href',
        type: 'url',
        validation: Rule => Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
      }
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