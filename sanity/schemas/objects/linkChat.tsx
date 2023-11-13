import {LinkIcon} from '@sanity/icons';

export default {
  title: 'Chat',
  name: 'linkChat',
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
