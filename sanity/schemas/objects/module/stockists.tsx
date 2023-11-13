import {PackageIcon} from '@sanity/icons';

export default {
  name: 'module.stockists',
  title: 'Stockists',
  type: 'object',
  icon: PackageIcon,
  fields: [
    {
      name: 'ref',
      title: 'Reference',
      type: 'string',
      description: 'lowercase only name that is used for scroll to component',
    },
    {
      name: 'sectionHeading',
      type: 'module.heading',
    },
    // Modules (Images)
    {
      name: 'stockist',
      title: 'Stockist',
      type: 'array',
      of: [
        {
          type: 'module.stockistReference',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      stockist0: 'stockist.0.person.name', // <- stockist.0 is a reference to stockist, and the preview component will automatically resolve the reference and return the name
      stockist1: 'stockist.1.person.name',
      stockist2: 'stockist.2.person.name',
      stockist3: 'stockist.3.person.name',
      stockist4: 'stockist.4.person.name',
      stockist5: 'stockist.5.person.name',
    },
    prepare: ({
      title,
      stockist0,
      stockist1,
      stockist2,
      stockist3,
      stockist4,
      stockist5,
    }) => {
      const stockist = [
        stockist0,
        stockist1,
        stockist2,
        stockist3,
        stockist4,
      ].filter(Boolean);
      const subtitle =
        stockist.length > 0 ? `stockist: ${stockist.join(', ')}` : '';
      const hasMorestockist = Boolean(stockist5);
      return {
        title: hasMorestockist ? `${subtitle}…` : subtitle,
      };
    },
  },
};
