import {ControlsIcon} from '@sanity/icons'

export default {
    icon: ControlsIcon,
    name: 'module.behaviour',
    title: 'Behaviour',
    type: 'object',
    fields: [
        {
            title: 'Enabled on Mobile',
            name: 'enabledMobile',
            type: 'boolean',
            initialValue: true
        },
        {
            title: 'Enabled on Desktop',
            name: 'enabledDesktop',
            type: 'boolean',
            initialValue: true
        }
    ]
}