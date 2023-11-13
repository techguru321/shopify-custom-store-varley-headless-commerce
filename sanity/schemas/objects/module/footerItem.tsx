import {PAGE_REFERENCES} from '../../../constants'

export default {
    name: "module.footerItem",
    type: "object",
    title: "Footer Item",
    fields: [
        {
            name: 'reference',
            type: 'array',
          of: [{type: 'linkExternal'},{type: 'linkInternal'}],
          },
    ]
}