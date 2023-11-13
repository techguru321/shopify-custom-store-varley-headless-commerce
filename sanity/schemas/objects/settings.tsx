import {ControlsIcon} from '@sanity/icons';

export default {
  icon: ControlsIcon,
  name: 'moduleSettings',
  title: 'Module Settings',
  type: 'object',
  groups: [
    {
      default: true,
      name: 'positioning',
      title: 'Positioning',
    },
    {
      name: 'push',
      title: 'Push',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'behaviour',
      title: 'Behaviour',
    },
  ],
  fields: [
    {
      name: 'positioning',
      type: 'module.positioning',
      group: 'positioning',
    },
    {
      name: 'push',
      type: 'push',
      group: 'push',
    },
    {
      name: 'image',
      type: 'module.background',
      group: 'media',
    },
    {
      name: 'colours',
      type: 'module.colours',
      group: 'media',
    },
    {
      name: 'behaviour',
      type: 'module.behaviour',
      group: 'behaviour',
    },
  ],
};
