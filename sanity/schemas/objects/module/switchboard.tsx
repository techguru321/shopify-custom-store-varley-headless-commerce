import {TransferIcon} from '@sanity/icons';

export default {
  name: 'module.switchboard',
  title: 'Switchboard',
  type: 'object',
  icon: TransferIcon,
  fields: [
    {
      name: 'sectionHeading',
      type: 'module.heading',
    },
    {
      title: 'Buttons',
      name: 'buttons',
      type: 'array',
      of: [{type: 'module.callToAction'}],
    },
  ],
};
