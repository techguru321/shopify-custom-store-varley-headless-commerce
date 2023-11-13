import {DashboardIcon} from '@sanity/icons'

export default {
    name: "module.mediaObject",
    type: "object",
    title: "Media Object",
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
            group: 'content'
        },
        {
            name: 'contentCta',
            title: 'Call to action',
            group: 'content',
            type: 'object',
            fields: [
                // Title
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                },
                // Link
                {
                    name: 'links',
                    title: 'Link',
                    type: 'array',
                    of: [{type: 'linkInternal'}],
                    validation: (Rule) => Rule.max(1),
                },
            ],
        },
        {
            name: 'media',
            type: 'module.media',
            group: 'media'
        }
    ]
}