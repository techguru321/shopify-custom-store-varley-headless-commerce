import {ImageIcon} from '@sanity/icons';
import pluralize from 'pluralize';

export default {
  name: 'module.postImages',
  title: 'Post Images',
  type: 'object',
  icon: ImageIcon,
  fields: [
    // Modules (Images)
    {
      name: 'modules',
      title: 'Images',
      type: 'array',
      of: [{type: 'module.simpleImage'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.required().max(2),
    },
    {
      name: 'display',
      type: 'string',
      title: 'Display as',
      description: 'How should we display these images?',
      options: {
        list: [
          {title: 'Stacked on top of eachother', value: 'stacked'},
          {title: 'In-line', value: 'inline'},
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    },
  ],
  preview: {
    select: {
      imageCount: 'modules.length',
    },
    prepare(selection) {
      const {imageCount} = selection;
      return {
        subtitle: 'Images',
        title: imageCount ? pluralize('image', imageCount, true) : 'No images',
      };
    },
  },
};
