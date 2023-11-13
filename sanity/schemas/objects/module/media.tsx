export default {
  name: 'module.media',
  title: 'Media',
  type: 'object',
  fields: [
    {
      name: 'mediaLayout',
      title: 'Media Layout',
      type: 'string',
      initialValue: 'flex-row',
      options: {
        layout: 'radio',
        list: [
          {value: 'flex-col  md:flex-row', title: 'Media | Content'},
          {
            value: 'flex-col  md:flex-row-reverse',
            title: 'Content | Media',
          },
        ],
      },
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {value: 'image', title: 'Single Image'},
          {value: 'carousel', title: 'Multiple Images'},
          {value: 'video', title: 'Video'},
        ],
      },
    },
    {
      name: 'image',
      type: 'module.image',
      hidden: ({parent}) => parent.mediaType !== 'image',
    },
    {
      name: 'carouselImages',
      type: 'module.carouselImages',
      hidden: ({parent}) => parent.mediaType !== 'carousel',
    },
    {
      name: 'video',
      type: 'video',
      hidden: ({parent}) => parent.mediaType !== 'video',
    },
  ],
};
