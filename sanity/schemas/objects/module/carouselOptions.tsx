import {ControlsIcon} from '@sanity/icons';
import {ControlledNumber} from '../../../components/inputs/controlled-number';

export default {
  icon: ControlsIcon,
  name: 'module.carouselOptions',
  title: 'Carousel Options',
  type: 'object',
  fieldsets: [
    {
      name: 'interactivityFieldset',
      title: 'Interactivity',
      options: {columns: 2},
    },
    {
      name: 'styleFieldset',
      title: 'Styling',
      options: {columns: 2},
    },
  ],
  fields: [
    {
      title: 'Active',
      name: 'active',
      type: 'boolean',
      fieldset: 'interactivityFieldset',
      initialValue: true,
    },
    {
      title: 'Slide Dots',
      name: 'slideDots',
      type: 'boolean',
      fieldset: 'interactivityFieldset',
      initialValue: false,
    },
    {
      title: 'Arrows',
      name: 'arrows',
      type: 'boolean',
      fieldset: 'interactivityFieldset',
      initialValue: false,
    },
    {
      title: 'Arrow Size',
      name: 'arrowSize',
      type: 'number',
      fieldset: 'interactivityFieldset',
    },
    {
      title: 'Autoplay',
      name: 'autoplay',
      type: 'boolean',
      fieldset: 'interactivityFieldset',
      initialValue: false,
    },
    {
      title: 'Loop',
      name: 'loop',
      type: 'boolean',
      fieldset: 'interactivityFieldset',
      initialValue: false,
    },
    {
      title: 'Slides To Scroll',
      name: 'slidesToScroll',
      fieldset: 'interactivityFieldset',
      type: 'number',
    },
    {
      name: 'autoplayDelay',
      title: 'Autoplay Delay',
      type: 'number',
      fieldset: 'interactivityFieldset',
      description: 'time in milliseconds (ms)',
      placeholder: 1000,
      inputComponent: ControlledNumber,
      options: {
        min: 1000,
        max: 20000,
        step: 500,
      },
    },
    {
      title: 'Breakpoint',
      name: 'breakpoint',
      type: 'string',
      fieldset: 'interactivityFieldset',
      description:
        "(min-width: 768px) an example of a carousel that's only active when the screen width is less than 768px:",
      options: {
        list: [
          {title: 'All', value: ''},
          {title: '(max-width: 640px)', value: '(max-width: 640px)'},
          {title: '(max-width: 768px)', value: '(max-width: 768px)'},
          {title: '(max-width: 1024px)', value: '(max-width: 1024px)'},
          {title: '(max-width: 1280px)', value: '(max-width: 1280px)'},
          {title: '(max-width: 1536px)', value: '(max-width: 1536px)'},
          {title: '(min-width: 640px)', value: '(min-width: 640px)'},
          {title: '(min-width: 768px)', value: '(min-width: 768px)'},
          {title: '(min-width: 1024px)', value: '(min-width: 1024px)'},
          {title: '(min-width: 1280px)', value: '(min-width: 1280px)'},
          {title: '(min-width: 1536px)', value: '(min-width: 1536px)'},
        ],
      },
    },
    {
      title: 'Align',
      name: 'align',
      type: 'string',
      fieldset: 'styleFieldset',
      description: 'Align the slider left centre or right',
      initialValue: 'start',
      options: {
        list: [
          {title: 'Start', value: 'start'},
          {title: 'Centre', value: 'center'},
          {title: 'End', value: 'end'},
        ],
      },
    },
    {
      title: 'Font',
      name: 'font',
      fieldset: 'styleFieldset',
      type: 'string',
      options: {
        list: [
          {title: 'plantin', value: 'font-plantin'},
          {title: 'plantinItalic', value: 'font-plantinItalic'},
          {title: 'nhaasReg', value: 'font-nhaasReg'},
          {title: 'nhaasMd', value: 'font-nhaasMd'},
          {title: 'nhaasLt', value: 'font-nhaasLt'},
        ], // <-- predefined values
      },
    },
    {
      title: 'Aspect Ratio',
      name: 'aspectRatio',
      fieldset: 'styleFieldset',
      type: 'string',
      options: {
        list: [
          {title: 'Portrait', value: 'aspect-[2/3]'},
          {title: 'Square', value: 'aspect-square'},
        ],
      },
    },
    {
      title: 'Slides to Show',
      name: 'slidesToShow',
      fieldset: 'styleFieldset',
      type: 'number',
    },
    {
      title: 'Font Size (px)',
      name: 'fontSize',
      fieldset: 'styleFieldset',
      type: 'number',
    },
    {
      title: 'Arrow Colour',
      name: 'arrowColour',
      fieldset: 'styleFieldset',
      type: 'color',
    },
  ],
};
