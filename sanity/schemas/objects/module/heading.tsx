export default {
    name: "module.heading",
    type: "object",
    title: "Heading",
    fields: [
        {
            name: 'heading',
            type: 'simpleBlockContent',
            title: 'Heading'
        },
        {
            name: 'subheading',
            type: 'simpleBlockContent'
        }
    ],
    preview: {
        select: {
            blocks: 'heading'
        },
        prepare(value) {
            const block = (value.blocks || []).find(block => block._type === 'block')
            return {
            title: block
                ? block.children
                .filter(child => child._type === 'span')
                .map(span => span.text)
                .join('')
                : 'No title'
            }
        }
    }
}