export default {
  name: 'module.spotContent',
  type: 'object',
  title: 'Spot Content',
  fields: [
    {
      name: 'productWithVariant',
      title: 'Product + Variant',
      type: 'productWithVariant',
    },
    {
      name: 'x',
      title: 'X Position',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    },
    {
      name: 'y',
      title: 'Y Position',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    },
  ],
};
