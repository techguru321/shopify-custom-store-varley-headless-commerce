import {ControlsIcon} from '@sanity/icons';

export default {
  icon: ControlsIcon,
  name: 'module.layout',
  title: 'Layout',
  type: 'object',
  fields: [
    {
      name: 'contentWidthMobile',
      title: 'Content Width Mobile',
      type: 'number',
      options: {
        range: {
          min: 0, // Minimum value
          max: 2000, // Maximum value
          step: 1, // Slider interval
        },
      },
    },
    {
      name: 'contentWidthDesk',
      title: 'Content Width Desktop',
      type: 'number',
      options: {
        range: {
          min: 0, // Minimum value
          max: 2000, // Maximum value
          step: 1, // Slider interval
        },
      },
    },
  ],
};
