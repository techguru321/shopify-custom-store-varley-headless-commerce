export default {
  name: 'module.stackedMedia',
  title: 'Stacked Media',
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
      name: 'imageOne',
      type: 'module.image',
    },
    {
      name: 'imageTwo',
      type: 'module.image',
    },
  ],
};
