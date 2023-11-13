import {DashboardIcon} from '@sanity/icons';

export default {
  name: 'module.mediaObjectGroup',
  type: 'object',
  title: 'Media Object Group',
  icon: DashboardIcon,
  groups: [
    {
      default: true,
      name: 'media',
      title: 'Media',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'config',
      title: 'Config',
    },
  ],
  fields: [
    {
      name: 'heading',
      type: 'module.heading',
      group: 'content',
    },
    {
      name: 'copy',
      type: 'simpleBlockContent',
      group: 'content',
    },
    {
      name: 'media',
      type: 'module.media',
      group: 'media',
    },
  ],
};
