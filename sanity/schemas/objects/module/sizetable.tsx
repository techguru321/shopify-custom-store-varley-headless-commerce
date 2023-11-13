// import {table} from 'datatable';

export default {
  name: 'module.sizetable',
  title: 'size chart table',
  type: 'object',
  fields: [
    {
      name: 'info',
      title: 'Table Information',
      type: 'simpleBlockContent',
    },
    {
      name: 'tables',
      type: 'array',
      of: [
        {
          type: 'object', 
          fields: [
            {
              name: 'unit',
              type: 'string'
            },
            {
              name: 'table',
              type: 'table',
            }
          ]
        }
      ],
    },
  ],
};
