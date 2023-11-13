export default {
    name: 'navigation.section',
    type: 'object',
    title: 'Section',
    fields: [   
      {
        name: 'navigationItem',
        type: 'linkInternal',
        title: 'Navigation Item'
      },
      {
        type: 'array',
        name: 'links',
        title: 'Links',
        of: [{ type: 'navigation.link' }, { type: 'navigation.image' }],
      }
    ],
    preview: {
      select: {
        title: 'navigationItem.altTitle',
      },
      prepare: ({ title }) => ({
        title: title,
      }),
    },
  }