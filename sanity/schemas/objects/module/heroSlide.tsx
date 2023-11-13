export default {
  name: 'module.heroSlide',
  title: 'Hero Slide',
  type: 'object',
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'positioning',
      title: 'Positioning',
    },
    {
      name: 'layout',
      title: 'Layout',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      group: 'editorial',
      options: {
        layout: 'radio',
        list: [
          {value: 'image', title: 'Single Image'},
          {value: 'video', title: 'Video'},
          {value: 'colour', title: 'Colour'},
        ],
      },
    },
    {
      name: 'image',
      type: 'module.image',
      group: 'editorial',
      hidden: ({parent}) => parent.mediaType !== 'image',
    },
    {
      name: 'video',
      type: 'video',
      group: 'editorial',
    },
    {
      name: 'colours',
      type: 'color',
      group: 'editorial',
      hidden: ({parent}) => parent.mediaType !== 'colour',
    },
    // Content
    {
      name: 'content',
      title: 'Overlay Content',
      type: 'array',
      group: 'editorial',
      of: [
        {
          name: 'heading',
          type: 'module.heading',
        },
        {
          name: 'copy',
          type: 'module.simpleCopy',
        },
        {
          name: 'callToAction',
          type: 'module.cta',
        },
        {
          name: 'imageOrLogo',
          type: 'module.image',
        },
        {
          name: 'switchboard',
          type: 'module.switchboard',
        },
      ],
    },
    {
      name: 'overlayAlign',
      title: 'Overlay Align',
      type: 'string',
      group: 'editorial',
      options: {
          direction: 'horizontal',
          list: [
              {title: 'Left', value: 'left'},
              {title: 'Center', value: 'center'},
              {title: 'Right', value: 'right'},
          ],
          layout: 'radio'
      }
    }, 
    {
      name: 'positioning',
      title: 'Positioning',
      type: 'module.positioning',
      group: 'positioning',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'module.layout',
      group: 'layout',
    },
  ],
};
