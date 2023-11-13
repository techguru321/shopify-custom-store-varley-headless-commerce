import {DashboardIcon} from '@sanity/icons';

export default {
  name: 'module.dualMediaObject',
  type: 'object',
  title: 'Dual Media Object',
  icon: DashboardIcon,
  fields: [
    {
      name: 'ref',
      title: 'Reference',
      type: 'string',
      description: 'lowercase only name that is used for scroll to component',
    },
    // Groups
    {
      name: 'mediaObjectItem',
      title: 'Media Item Object',
      type: 'array',
      of: [{type: 'module.mediaObjectGroup'}],
    },
  ],
};
