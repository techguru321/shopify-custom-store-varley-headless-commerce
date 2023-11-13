import {StarIcon} from '@sanity/icons';

export default {
  name: 'document.benefits',
  title: 'Benefits',
  type: 'document',
  icon: StarIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      const {name} = selection;

      return {
        title: name,
      };
    },
  },
};
