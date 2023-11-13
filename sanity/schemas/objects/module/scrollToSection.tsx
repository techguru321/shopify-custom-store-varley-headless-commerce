export default {
  name: 'module.scrollToSection',
  title: 'Scroll To Section',
  type: 'object',
  fields: [
    // Groups
    {
      name: 'scrollNav',
      title: 'Scroll Nav',
      type: 'array',
      of: [{type: 'module.scrollNavItem'}],
    },
  ],
};
