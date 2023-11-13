import {BookIcon} from '@sanity/icons'

const TITLE = 'Blogs'

export default {
  name: 'blogs',
  title: TITLE,
  type: 'document',
  icon: BookIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Hero
    {
      name: 'hero',
      title: 'Hero',
      type: 'hero.blogs',
      group: 'editorial',
    },
    // Modules
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {type: 'module.callout'},
        {type: 'module.callToAction'},
        {type: 'module.collection'},
        {type: 'module.image'},
        {type: 'module.product'},
        {type: 'module.images'},
        {type: 'module.accordion'},
        {type: 'module.tabs'},
        {type: 'module.uiComponent'},
        {type: 'module.people'},
      ],
      group: 'editorial',
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.blogs',
      group: 'seo',
    },
  ],
  preview: {
    prepare() {
      return {
        // media: icon,
        subtitle: 'Blogs',
        title: TITLE,
      }
    },
  },
}
