export default {
  title: 'Shopping Note',
  name: 'shoppingNote',
  type: 'object',
  fields: [
    // Title
    {
      title: 'title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    // Content
    {
      name: 'content',
      title: 'Content',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
};
