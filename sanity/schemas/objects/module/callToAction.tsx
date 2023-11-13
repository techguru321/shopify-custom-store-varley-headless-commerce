import {BlockElementIcon, ImageIcon} from '@sanity/icons';

export default {
  name: 'module.callToAction',
  title: 'Call to action',
  type: 'object',
  icon: BlockElementIcon,
  fieldsets: [
    {
      name: 'copy',
      title: 'Copy',
    },
  ],
  fields: [
    // Layout
    {
      name: 'layout',
      title: 'Layout direction',
      type: 'string',
      initialValue: 'left',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          {
            title: 'Content / Copy',
            value: 'left',
          },
          {
            title: 'Copy / Content',
            value: 'right',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    // Link
    {
      name: 'links',
      title: 'Link',
      type: 'array',
      of: [
        {type: 'linkInternal'},
        {type: 'linkExternal'},
        {type: 'linkChat'},
        {type: 'linkEmail'},
      ],
      validation: (Rule) => Rule.max(1),
      fieldset: 'copy',
    },
    // Content
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      validation: (Rule) => Rule.required().max(1),
      of: [
        {
          icon: ImageIcon,
          type: 'image',
          options: {hotspot: true},
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'links[0].altTitle',
    },
    prepare(selection) {
      const {title} = selection;
      return {
        subtitle: 'Call to action',
        title,
      };
    },
  },
};
