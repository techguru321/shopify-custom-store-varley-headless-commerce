import {ImageIcon} from '@sanity/icons'
import pluralize from 'pluralize'

export default {
  name: 'module.images',
  title: 'Images',
  type: 'object',
  icon: ImageIcon,
  fields: [
    // Modules (Images)
    {
      name: 'modules',
      title: 'Images',
      type: 'array',
      of: [{type: 'module.image'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.required().max(2),
    },
    // Full width
    {
      name: 'fullWidth',
      title: 'Full width',
      type: 'boolean',
      description: 'Display single image at full width (on larger breakpoints)',
      initialValue: false,
      hidden: ({parent}) => parent?.modules.length > 1,
    },
    {
      name: 'display',
      type: 'string',
      title: 'Display as',
      description: 'How should we display these images?',
      options: {
        list: [
          { title: 'Stacked on top of eachother', value: 'stacked' },
          { title: 'In-line', value: 'inline' },
          { title: 'Carousel', value: 'carousel' },
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    },
    {
      name: 'mobileCount',
      title: 'Slides at Mobile',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(20)
    },
    {
      name: 'tabletCount',
      title: 'Slides at Tablet',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(20)
    },
    {
      name: 'desktopCount',
      title: 'Slides at Desktop',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(20)
    },
    // Vertical alignment
    {
      name: 'verticalAlign',
      title: 'Vertical alignment',
      type: 'string',
      initialValue: 'top',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          {
            title: 'Top',
            value: 'top',
          },
          {
            title: 'Center',
            value: 'center',
          },
          {
            title: 'Bottom',
            value: 'bottom',
          },
        ],
      },
      hidden: ({parent}) => !parent?.modules || parent?.modules.length < 2,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      imageCount: 'modules.length',
    },
    prepare(selection) {
      const {imageCount} = selection
      return {
        subtitle: 'Images',
        title: imageCount ? pluralize('image', imageCount, true) : 'No images',
      }
    },
  },
}
