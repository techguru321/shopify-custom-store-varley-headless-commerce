import {UsersIcon} from '@sanity/icons';

export default {
  name: 'module.referAFriend',
  title: 'Refer A Friend',
  type: 'object',
  icon: UsersIcon,
  fields: [
    {
      name: 'ref',
      title: 'Reference',
      type: 'string',
      description: 'lowercase only name that is used for scroll to component',
    },
  ],
};
