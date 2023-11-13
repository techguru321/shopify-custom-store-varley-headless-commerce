export default {
  name: 'module.failsafe',
  type: 'object',
  title: 'Failsafe',
  fields: [
    {
      name: 'heading',
      type: 'simpleBlockContent',
      title: 'Heading',
    },
    {
      name: 'bgColour',
      type: 'module.colours',
    },
  ],
  preview: {
    select: {
      blocks: 'heading',
    },
    prepare(value) {
      const block = (value.blocks || []).find(
        (block) => block._type === 'block',
      );
      return {
        title: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No title',
      };
    },
  },
};
