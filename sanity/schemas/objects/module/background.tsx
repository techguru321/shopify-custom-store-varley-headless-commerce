import {ControlsIcon} from '@sanity/icons'

export default {
    icon: ControlsIcon,
    name: 'module.background',
    title: 'Module Background',
    type: 'object',
    fields: [
        {
            name: 'imageMobile',
            title: 'Image Mobile',
            type: 'module.image',
        },
        {
            name: 'image',
            title: 'Image Desktop',
            type: 'module.image',
        },
    ]
}