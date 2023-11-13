export default {
  name: 'module.instaReference',
  type: 'object',
  title: 'Insta reference',
  fields: [
    {
      name: 'insta',
      type: 'reference',
      to: [
        {
          type: 'document.inVarley',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'insta.caption',
      media: 'insta.image.asset',
    },
  },
};
