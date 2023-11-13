export default {
  name: 'module.cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    // Link
    {
      name: 'links',
      title: 'Link',
      type: 'array',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
      validation: (Rule) => Rule.max(1),
    },
  ],
  hidden: ({parent}) => parent.variant !== 'callToAction',
};
