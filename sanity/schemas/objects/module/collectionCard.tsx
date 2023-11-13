import {PAGE_REFERENCES} from '../../../constants'

export default {
    name: "module.collectionCard",
    type: "object",
    title: "Collection Card",
    fields: [
      {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          validation: (Rule) => Rule.required(),
      },
      {
        name: 'collectionHeading',
        type: 'simpleBlockContent',
        title: 'Collection Heading',
      },
      {
        name: 'reference',
        type: 'reference',
        weak: true,
        validation: (Rule) => Rule.required(),
        to: PAGE_REFERENCES,
      },
    ],
    preview: {
      select: {
        title: "collectionHeading",
      },
    },
};





