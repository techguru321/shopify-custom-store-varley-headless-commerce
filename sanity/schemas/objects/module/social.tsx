import {EarthGlobeIcon} from '@sanity/icons'

export default {
  name: 'module.social',
  title: 'Socials',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
      // Modules (Images)
      {
          name: "social",
          title: "Social",
          type: "array",
          of: [
            {
              type: "module.socialReference",
            },
          ],
      }
  ],
  preview: {
    select: {
      title: 'title',
      social0: 'social.0.person.name', // <- social.0 is a reference to social, and the preview component will automatically resolve the reference and return the name
      social1: 'social.1.person.name',
      social2: 'social.2.person.name'
    },
    prepare: ({title, social0, social1, social2}) => {
        
      const social = [social0, social1].filter(Boolean)
      const subtitle = social.length > 0 ? `social: ${social.join(', ')}` : ''
      const hasMoresocial = Boolean(social2)
      return {
        title: hasMoresocial ? `${subtitle}…` : subtitle,
      }
    }
  }
}