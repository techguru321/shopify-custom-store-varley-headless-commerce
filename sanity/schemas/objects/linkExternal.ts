import {EarthGlobeIcon} from '@sanity/icons';

export default {
  title: 'External Link',
  name: 'linkExternal',
  type: 'object',
  icon: EarthGlobeIcon,
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
    // URL
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    },
    // Open in a new window
    {
      title: 'Open in a new window?',
      name: 'newWindow',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'altTitle',
      url: 'url',
    },
    prepare(selection) {
      const {title, url} = selection;

      let subtitle = [];
      if (url) {
        subtitle.push(`→ ${url}`);
      }

      return {
        // media: image,
        subtitle: subtitle.join(' '),
        title,
      };
    },
  },
};
