export default {
    name: "module.footerCol",
    type: "object",
    title: "Footer Col",
    fields: [
        {
            name: 'footerColName',
            title: 'Footer Column Name',
            type: 'string',
        },
        {
            name: 'reference',
            type: 'array',
            of: [{type: 'linkExternal'},{type: 'linkInternal'}],
        },
    ]
}