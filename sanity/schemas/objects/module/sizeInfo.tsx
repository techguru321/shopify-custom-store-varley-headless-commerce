// import {table} from 'datatable';

export default {
  name: 'module.sizeinfo',
  title: 'Size info',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'image',
      type: 'image',
    },
    {
      name: 'contents',
      title: 'contents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'content',
              type: 'text',
            },
            {
              name: 'position',
              type: 'string',
              options: {
                direction: 'horizontal',
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Right', value: 'right'},
                ],
                layout: 'radio'
              }
            },
            {
              name: 'indicatorPosition',
              type: 'object',
              fields: [
                {type: 'number', name: 'top'},
                {type: 'number', name: 'length'}
              ] 
            }
          ],
        }
      ]
    },
  ],
};
