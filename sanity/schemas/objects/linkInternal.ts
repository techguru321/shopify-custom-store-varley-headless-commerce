import {LinkIcon} from '@sanity/icons';
import {PAGE_REFERENCES} from '../../constants';
import {getPriceRange} from '../../utils/getPriceRange';

export default {
  title: 'Internal Link',
  name: 'linkInternal',
  type: 'object',
  icon: LinkIcon,
  fields: [
    // Title
    {
      title: 'Alt Title',
      name: 'altTitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'button--primary'},
          {title: 'Secondary', value: 'button--secondary'},
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'buttonSize',
      title: 'Button Size',
      type: 'string',
      options: {
        list: [
          {title: 'Normal', value: ''},
          {title: 'Large', value: 'button--large'},
          {title: 'Full', value: 'button--full'},
        ],
        layout: 'dropdown',
      },
    },
    // Reference
    {
      name: 'reference',
      type: 'reference',
      weak: true,
      validation: (Rule) => Rule.required(),
      to: PAGE_REFERENCES,
    },
  ],
  preview: {
    select: {
      reference: 'reference',
      referenceProductTitle: 'reference.store.title',
      referenceProductPriceRange: 'reference.store.priceRange',
      referenceTitle: 'reference.title',
      referenceType: 'reference._type',
      title: 'altTitle',
    },
    prepare(selection) {
      const {
        reference,
        referenceProductPriceRange,
        referenceProductTitle,
        referenceTitle,
        referenceType,
        title,
      } = selection;

      let subtitle = [];
      if (reference) {
        subtitle.push([
          `→ ${referenceTitle || referenceProductTitle || reference?._id}`,
        ]);
        if (referenceType === 'product' && referenceProductPriceRange) {
          subtitle.push(`(${getPriceRange(referenceProductPriceRange)})`);
        }
      } else {
        subtitle.push('(Nonexistent document reference)');
      }

      return {
        // media: image,
        subtitle: subtitle.join(' '),
        title,
      };
    },
  },
};
