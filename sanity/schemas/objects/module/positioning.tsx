import {ControlsIcon} from '@sanity/icons';

export default {
  icon: ControlsIcon,
  name: 'module.positioning',
  title: 'Positioning',
  type: 'object',
  fields: [
    {
      name: 'xMobile',
      title: 'X Pos Mob (left to right)',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'yMobile',
      title: 'Y Pos Mob (top to bottom)',
      type: 'string',
      options: {
        list: [
          {title: 'Top', value: 'top'},
          {title: 'Middle', value: 'middle'},
          {title: 'Bottom', value: 'bottom'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'xDesk',
      title: 'X Pos Desk (left to right)',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'yDesk',
      title: 'Y Pos Desk (top to bottom)',
      type: 'string',
      options: {
        list: [
          {title: 'Top', value: 'top'},
          {title: 'Middle', value: 'middle'},
          {title: 'Bottom', value: 'bottom'},
        ],
        layout: 'radio',
      },
    },
  ],
};
