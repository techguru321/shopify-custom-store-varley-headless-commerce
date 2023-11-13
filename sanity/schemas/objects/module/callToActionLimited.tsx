export default {
    name: 'module.callToActionLimited',
    title: 'Call to Action',
    type: 'object',
    options: {
        columns: 2 // Puts the fields side-by-side
    },
    fields: [
        {
            name: 'text',
            title: 'Link text',
            type: 'string'
        },
        {
            name: 'url',
            title: 'Link URL',
            type: 'url'
        }
    ]
}