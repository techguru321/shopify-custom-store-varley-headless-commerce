import {StarIcon} from '@sanity/icons';

export default {
  name: 'module.usps',
  title: 'Unique Selling Points',
  type: 'object',
  icon: StarIcon,
  fields: [
    // Modules (Images)
    {
      name: 'usp',
      title: 'USP',
      type: 'array',
      of: [
        {
          type: 'module.uspReference',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      usp0: 'usp.0.person.name', // <- usp.0 is a reference to usp, and the preview component will automatically resolve the reference and return the name
      usp1: 'usp.1.person.name',
      usp2: 'usp.2.person.name',
      usp3: 'usp.3.person.name',
      usp4: 'usp.4.person.name',
      usp5: 'usp.5.person.name',
    },
    prepare: ({title, usp0, usp1, usp2, usp3, usp4, usp5}) => {
      const usp = [usp0, usp1, usp2, usp3, usp4].filter(Boolean);
      const subtitle = usp.length > 0 ? `usp: ${usp.join(', ')}` : '';
      const hasMoreusp = Boolean(usp5);
      return {
        title: hasMoreusp ? `${subtitle}…` : subtitle,
      };
    },
  },
};
