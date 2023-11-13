import {DashboardIcon} from '@sanity/icons';

export default {
  name: 'module.#inVarley',
  type: 'object',
  title: '#inVarley',
  icon: DashboardIcon,
  fields: [
    {
      name: 'heading',
      type: 'module.heading',
    },
    // Gets an array of insta blocks from the list of instas
    {
      name: 'instas',
      title: 'Instas',
      type: 'array',
      of: [
        {
          type: 'module.instaReference',
        },
      ],
    },
  ],
};
