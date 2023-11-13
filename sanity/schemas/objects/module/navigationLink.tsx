export default {
    name: 'navigation.link',
    type: 'object',
    title: 'Link',
    preview: {
      select: {
        title: 'navigationColName',
        targetTitle: 'target.title',
      },
      prepare: ({ title, targetTitle }) => ({
        title: title || targetTitle,
      }),
    },
    fields: [
      {
        name: 'navigationColName',
        title: 'Navigation Column Name',
        type: 'string',
      },
      {
        type: 'array',
        name: 'children',
        title: 'Children',
        of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
      },
    ],
  }