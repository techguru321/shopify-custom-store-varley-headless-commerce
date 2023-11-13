export default {
  name: 'module.insta',
  title: 'Unique Selling Points',
  type: 'object',
  fields: [
    // Modules (Images)
    {
      name: 'insta',
      title: 'Insta',
      type: 'array',
      of: [
        {
          type: 'module.instaReference',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      insta0: 'insta.0.insta.caption', // <- insta.0 is a reference to insta, and the preview component will automatically resolve the reference and return the name
      insta1: 'insta.1.insta.caption',
      insta2: 'insta.2.insta.caption',
      insta3: 'insta.3.insta.caption',
      insta4: 'insta.4.insta.caption',
      insta5: 'insta.5.insta.caption',
    },
    prepare: ({title, insta0, insta1, insta2, insta3, insta4, insta5}) => {
      const insta = [insta0, insta1, insta2, insta3, insta4].filter(Boolean);
      const subtitle = insta.length > 0 ? `insta: ${insta.join(', ')}` : '';
      const hasMoreinsta = Boolean(insta5);
      return {
        title: hasMoreinsta ? `${subtitle}…` : subtitle,
      };
    },
  },
};
