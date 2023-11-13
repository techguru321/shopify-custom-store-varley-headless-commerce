export default {
    type: 'object',
    name: 'module.uiComponent',
    title: 'UI component reference',
    fields: [
      {
        type: 'string',
        name: 'name'
      }
    ],
    preview: {
      select: {
        title: 'name'
      },
      prepare({ title }) {
        return {
          title: `UI reference: ${title}`
        }
      }
    }
}