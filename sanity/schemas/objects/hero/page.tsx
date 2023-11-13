export default {
  name: 'hero.page',
  title: 'Page hero',
  type: 'object',
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'sizing',
      title: 'Sizing',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    {
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      group: 'editorial',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'module.heroSlide',
        },
      ],
    },
    {
      name: 'sizing',
      type: 'module.sizing',
      group: 'sizing',
    },
    {
      name: 'carouselOptions',
      type: 'module.carouselOptions',
      group: 'settings',
    },
  ],
};
