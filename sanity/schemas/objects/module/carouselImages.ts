export default {
  name: 'module.carouselImages',
  title: 'Carousel Images',
  type: 'object',
  fields: [
    {
      name: 'carouselOptions',
      type: 'module.carouselOptions',
    },
    // Modules (Images)
    {
      name: 'modules',
      title: 'Images',
      type: 'array',
      of: [{type: 'module.image'}],
      options: {
        layout: 'grid',
      },
    },
  ],
};
