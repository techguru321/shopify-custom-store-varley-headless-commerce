import {ControlsIcon} from '@sanity/icons';

export default {
  icon: ControlsIcon,
  name: 'module.sizing',
  title: 'Sizing',
  type: 'object',
  fields: [
    {
      name: 'marginTopMobile',
      title: 'Margin Top Mobile',
      type: 'number',
      options: {
        range: {
          min: 0, // Minimum value
          max: 200, // Maximum value
          step: 1, // Slider interval
        },
      },
    },
    {
      name: 'marginBottomMobile',
      title: 'Margin Bottom Mobile',
      type: 'number',
      options: {
        range: {
          min: 0, // Minimum value
          max: 200, // Maximum value
          step: 1, // Slider interval
        },
      },
    },
    {
      name: 'bannerHeightMobile',
      title: 'Banner Height Mobile',
      type: 'number',
      options: {
        range: {
          min: 0, // Minimum value
          max: 1000, // Maximum value
          step: 1, // Slider interval
        },
      },
    },
    {
      name: 'marginTopDesk',
      title: 'Margin Top Desktop',
      type: 'number',
      options: {
        range: {
          min: 0, // Minimum value
          max: 200, // Maximum value
          step: 1, // Slider interval
        },
      },
    },
    {
      name: 'marginBottomDesk',
      title: 'Margin Bottom Desktop',
      type: 'number',
      options: {
        range: {
          min: 0, // Minimum value
          max: 200, // Maximum value
          step: 1, // Slider interval
        },
      },
    },
    {
      name: 'bannerHeightDesk',
      title: 'Banner Height Desktop',
      type: 'number',
      options: {
        range: {
          min: 0, // Minimum value
          max: 1000, // Maximum value
          step: 1, // Slider interval
        },
      },
    },
    {
      name: 'bannerHeightUnit',
      title: 'Banner Height Unit',
      type: 'string',
      options: {
        list: [
          {title: 'px', value: 'px'},
          {title: 'vh', value: 'vh'},
        ], // <-- predefined values
        layout: 'dropdown', // <-- defaults to 'dropdown'
      },
    },
  ],
};
