import {MasterDetailIcon} from '@sanity/icons';
import pluralize from 'pluralize';
import blocksToText from '../../../utils/blocksToText';

export default {
  name: 'module.tabs',
  title: 'Tabs',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    // Groups
    {
      name: 'groups',
      title: 'Groups',
      type: 'array',
      of: [
        {
          name: 'group',
          title: 'Group',
          type: 'object',
          icon: false,
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [
                {
                  lists: [],
                  marks: {
                    annotations: [
                      // Email
                      {
                        name: 'annotationLinkEmail',
                        type: 'annotationLinkEmail',
                      },
                      // Internal link
                      {
                        name: 'annotationLinkInternal',
                        type: 'annotationLinkInternal',
                      },
                      // URL
                      {
                        name: 'annotationLinkExternal',
                        type: 'annotationLinkExternal',
                      },
                    ],
                    decorators: [
                      {
                        title: 'Italic',
                        value: 'em',
                      },
                      {
                        title: 'Strong',
                        value: 'strong',
                      },
                    ],
                  },
                  // Regular styles
                  styles: [],
                  // Paragraphs
                  type: 'block',
                },
                // Custom blocks
                {
                  name: 'blockAccordion',
                  type: 'module.accordion',
                },
                {
                  name: 'blockCallout',
                  type: 'module.callout',
                },
                {
                  name: 'blockGrid',
                  type: 'module.grid',
                },
                {
                  name: 'blockImages',
                  type: 'module.images',
                },
                {
                  name: 'blockInstagram',
                  type: 'module.instagram',
                },
                {
                  name: 'blockProducts',
                  type: 'module.products',
                },
                {
                  name: 'blockPeople',
                  type: 'module.people',
                },
                {
                  name: 'blockStockists',
                  type: 'module.stockists',
                },
                {
                  name: 'blockFailsafe',
                  type: 'module.failsafe',
                },
                {
                  name: 'blockSwitchboard',
                  type: 'module.switchboard',
                },
                {
                  name: 'blockShopTheLook',
                  type: 'module.shopTheLook',
                },
                {
                  name: 'blockSizeInfo',
                  type: 'module.sizeinfo',
                },
                {
                  name: 'blockSizeTable',
                  type: 'module.sizetable',
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              body: 'body',
              title: 'title',
            },
            prepare(selection) {
              const {body, title} = selection;
              return {
                subtitle: body && blocksToText(body),
                title,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      groupCount: 'groups.length',
      url: 'url',
    },
    prepare(selection) {
      const {groupCount} = selection;
      return {
        subtitle: 'Tabs',
        title: groupCount ? pluralize('group', groupCount, true) : 'No groups',
      };
    },
  },
};
