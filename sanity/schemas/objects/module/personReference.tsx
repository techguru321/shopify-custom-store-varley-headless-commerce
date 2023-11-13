export default {
  name: 'module.personReference',
  type: 'object',
  title: 'Person reference',
  fields: [
    {
      name: 'person',
      type: 'reference',
      to: [
        {
          type: 'document.person',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'person.name',
      subtitle: 'person.role',
      media: 'person.image.asset',
    },
  },
};
