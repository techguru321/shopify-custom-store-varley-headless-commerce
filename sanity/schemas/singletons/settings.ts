import {CogIcon, PackageIcon} from '@sanity/icons';

const TITLE = 'Settings';

export default {
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
    },
    {
      name: 'global',
      title: 'Global Settings',
    },
    {
      name: 'productOptions',
      title: 'Product options',
    },
    {
      name: 'notFoundPage',
      title: '404 page',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // header desktop top nav
    {
      type: 'array',
      name: 'desktopTopNavigation',
      title: 'Header Desktop Top Navigation',
      group: 'navigation',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
    },
    // header desktop main nav
    {
      type: 'array',
      name: 'desktopNavigation',
      title: 'Header Desktop Main Navigation',
      group: 'navigation',
      of: [
        {type: 'navigation.section'},
        {type: 'linkInternal'},
        {type: 'linkExternal'},
      ],
    },
    // header mobile nav
    {
      type: 'array',
      name: 'mobileNavigation',
      title: 'Header Mobile Navigation',
      group: 'navigation',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
    },
    // header mobile page nav
    {
      type: 'array',
      name: 'mobilePageNavigation',
      title: 'Header Mobile Page Navigation',
      group: 'navigation',
      of: [
        {type: 'navigation.section'},
        {type: 'linkInternal'},
        {type: 'linkExternal'},
      ],
    },
    // footer nav
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'navigation',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        {
          name: 'footerCols',
          title: 'Footer Columns',
          type: 'array',
          of: [{type: 'module.footerCol'}],
        },
        {
          name: 'footerLegal',
          title: 'Footer Legal',
          type: 'array',
          of: [{type: 'linkExternal'}, {type: 'linkInternal'}],
        },
        // Text
        {
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [
            {
              lists: [],
              marks: {
                annotations: [
                  // Email
                  {
                    title: 'Email',
                    name: 'annotationLinkEmail',
                    type: 'annotationLinkEmail',
                  },
                  // Internal link
                  {
                    title: 'Internal page',
                    name: 'annotationLinkInternal',
                    type: 'annotationLinkInternal',
                  },
                  // URL
                  {
                    title: 'URL',
                    name: 'annotationLinkExternal',
                    type: 'annotationLinkExternal',
                  },
                ],
                decorators: [],
              },
              // Block styles
              styles: [{title: 'Normal', value: 'normal'}],
              type: 'block',
            },
          ],
        },
      ],
    },
    // Keys & ID's
    {
      name: 'globalKeys',
      title: "Keys & ID's",
      type: 'object',
      group: 'global',
      fields: [
        {
          name: 'gorgias',
          title: 'Gorgias Chat ID',
          type: 'string',
        },
        {
          name: 'klevuApiUrl',
          title: 'Klevu API URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        },
        {
          name: 'klevuApiKey',
          title: 'Klevu API Key',
          type: 'string',
          validation: (Rule) => Rule.required().min(10),
        },
      ],
    },
    // Custom product options
    {
      name: 'customProductOptions',
      title: 'Custom product options',
      type: 'array',
      group: 'productOptions',
      of: [
        {
          name: 'customProductOption.color',
          type: 'customProductOption.color',
        },
        {
          name: 'customProductOption.size',
          type: 'customProductOption.size',
        },
      ],
      validation: (Rule) =>
        Rule.custom((options) => {
          // Each product option type must have a unique title
          if (options) {
            const uniqueTitles = new Set(options.map((option) => option.title));
            if (options.length > uniqueTitles.size) {
              return 'Each product option type must have a unique title';
            }
          }
          return true;
        }),
    },
    // Custom Color Categories
    {
      title: 'Custom Color Categories',
      name: 'customColorCategories',
      type: 'array',
      group: 'productOptions',
      of: [
        {
          type: 'object',
          name: 'colorCategory',
          fields: [
            {name: 'categoryName', type: 'string', title: 'Category Name'},
            {
              name: 'categoryContent',
              type: 'text',
              title: 'Category Content(splited by comma)',
            },
          ],
        },
      ],
    },
    // Not found page
    {
      name: 'notFoundPage',
      title: '404 page',
      type: 'object',
      group: 'notFoundPage',
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
          type: 'text',
          rows: 2,
        },
        {
          name: 'collection',
          title: 'Collection',
          type: 'reference',
          description: 'Collection products displayed on this page',
          weak: true,
          to: [
            {
              name: 'collection',
              type: 'collection',
            },
          ],
        },
        // Color theme
        {
          name: 'colorTheme',
          title: 'Color theme',
          type: 'reference',
          to: [{type: 'colorTheme'}],
        },
      ],
    },
    // Global site alerts
    {
      name: 'globalAlerts',
      title: 'Alerts',
      type: 'object',
      group: 'global',
      fields: [
        {
          name: 'carouselOptions',
          type: 'module.carouselOptions',
        },
        {
          title: 'URL',
          name: 'url',
          type: 'url',
          description: 'The main site url. Used to create canonical url',
        },
        // Gets an array of alerts from the list of alerts
        {
          name: 'alerts',
          title: 'Alerts',
          type: 'array',
          of: [
            {
              type: 'module.alertReference',
            },
          ],
        },
      ],
    },
    // Social Accounts
    {
      name: 'socials',
      title: 'Social Accounts',
      type: 'array',
      group: 'navigation',
      of: [{type: 'module.socialReference'}],
    },
    // Countries,
    {
      name: 'countries',
      title: 'Countries',
      type: 'array',
      group: 'navigation',
      of: [{type: 'module.countryReference'}],
    },
    // Shopping notes
    {
      name: 'shoppingNotes',
      title: 'Shopping notes',
      type: 'array',
      group: 'global',
      of: [
        {
          name: 'shoppingNote',
          type: 'shoppingNote',
        },
      ],
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      description: 'Defaults for every page',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        {
          name: 'title',
          title: 'Site title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          validation: (Rule) =>
            Rule.max(150).warning(
              'Longer descriptions may be truncated by search engines',
            ),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      };
    },
  },
};
