import {BellIcon} from '@sanity/icons'

export default {
    name: 'alert',
    title: 'Site Alert',
    type: 'document',
    icon: BellIcon,
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'For internal use only.'
      },
      {
        name: 'text',
        title: 'Alert text',
        type: 'alertBlockContent'
      }
    ]
  }