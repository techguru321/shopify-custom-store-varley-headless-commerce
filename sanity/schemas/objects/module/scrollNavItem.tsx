export default {
  name: 'module.scrollNavItem',
  title: 'Scroll To Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'sectionRef',
      title: 'Section Reference',
      type: 'string',
      description:
        'Needs to correspond to the section ref you set up, i.e. people > people',
    },
  ],
};
