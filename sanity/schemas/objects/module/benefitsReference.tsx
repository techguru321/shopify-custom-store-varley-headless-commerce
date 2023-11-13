export default {
  name: 'module.benefitsReference',
  type: 'object',
  title: 'Benefits reference',
  fields: [
    {
      name: 'benefit',
      type: 'reference',
      to: [
        {
          type: 'document.benefits',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'benefit.name',
    },
  },
};
