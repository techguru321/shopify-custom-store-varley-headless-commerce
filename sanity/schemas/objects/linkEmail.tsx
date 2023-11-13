import {LinkIcon} from '@sanity/icons';

export default {
  title: 'Email',
  name: 'linkEmail',
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
    // Reference
    {
      name: 'reference',
      title: 'Reference',
      type: 'string',
    },
  ],
};
