import {StarIcon} from '@sanity/icons';

export default {
  name: 'module.benefit',
  title: 'Benefit',
  type: 'object',
  icon: StarIcon,
  fields: [
    // Modules (Images)
    {
      name: 'benefit',
      title: 'Benefit',
      type: 'array',
      of: [
        {
          type: 'module.benefitsReference',
        },
      ],
      validation: (Rule) => Rule.length(3),
    },
  ],
  preview: {
    select: {
      title: 'title',
      benefit0: 'benefit.0.benefit.name', // <- benefit.0 is a reference to benefit, and the preview component will automatically resolve the reference and return the name
      benefit1: 'benefit.1.benefit.name',
      benefit2: 'benefit.2.benefit.name',
      benefit3: 'benefit.3.benefit.name',
      benefit4: 'benefit.4.benefit.name',
      benefit5: 'benefit.5.benefit.name',
    },
    prepare: ({
      title,
      benefit0,
      benefit1,
      benefit2,
      benefit3,
      benefit4,
      benefit5,
    }) => {
      const benefit = [benefit0, benefit1, benefit2, benefit3, benefit4].filter(
        Boolean,
      );
      const subtitle =
        benefit.length > 0 ? `benefit: ${benefit.join(', ')}` : '';
      const hasMorebenefit = Boolean(benefit5);
      return {
        title: hasMorebenefit ? `${subtitle}…` : subtitle,
      };
    },
  },
};
