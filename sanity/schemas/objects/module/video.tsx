import {PlayIcon} from '@sanity/icons'
import {getExtension} from '@sanity/asset-utils'

export default {
    icon: PlayIcon,
    name: 'video',
    title: 'Video',
    type: 'object',
    fields: [
        {
            name: 'desktopVideo', 
            type: 'file',
            validation: Rule => Rule.custom((value) => {
                if (!value) {
                    return false
                }

                const filetype = getExtension(value.asset._ref)
                if (filetype !== 'mp4') {
                    return 'Video must be a MP4'
                }
                
                return true
            })
        },
        {
            name: 'mobileVideo', 
            type: 'file',
            validation: Rule => Rule.custom((value) => {
                if (!value) {
                    return false
                }

                const filetype = getExtension(value.asset._ref)
                if (filetype !== 'mp4') {
                    return 'Video must be a MP4'
                }
                
                return true
            })
        },
        {name: 'overlayImage', type: 'module.responsiveImage'}
    ]
}
