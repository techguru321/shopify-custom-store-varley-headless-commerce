import {StackCompactIcon} from '@sanity/icons';
import pluralize from 'pluralize';
import blocksToText from '../../../utils/blocksToText';

export default {
  name: 'module.shopTheLook',
  title: 'Shop the look',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    // Groups
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'module.variantsOrder'}],
    },
  ],
  preview: {
    select: {
      groupCount: 'products.length',
      url: 'url',
    },
    prepare(selection) {
      const {groupCount} = selection;
      return {
        subtitle: 'Accordion',
        title: groupCount ? pluralize('group', groupCount, true) : 'No groups',
      };
    },
  },
};
