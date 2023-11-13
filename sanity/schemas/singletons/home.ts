import {HomeIcon} from '@sanity/icons';

const TITLE = 'Home';

export default {
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Some frontend will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    // Show hero
    {
      name: 'showHero',
      title: 'Show hero',
      type: 'boolean',
      description: 'If disabled, page title will be displayed instead',
      initialValue: false,
      group: 'editorial',
    },
    // Hero
    {
      name: 'hero',
      title: 'Hero',
      type: 'hero.page',
      hidden: ({document}) => !document?.showHero,
      group: 'editorial',
    },
    // Modules
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {type: 'module.callout'},
        {type: 'module.callToAction'},
        {type: 'module.collection'},
        {type: 'module.collectionCarousel'},
        {type: 'module.collectionListingCarousel'},
        {type: 'module.productsCarousel'},
        {type: 'module.mediaObject'},
        {type: 'module.image'},
        {type: 'module.product'},
        {type: 'module.images'},
        {type: 'module.accordion'},
        {type: 'module.tabs'},
        {type: 'module.uiComponent'},
        {type: 'module.people'},
        {type: 'module.stockists'},
        {type: 'module.switchboard'},
        {type: 'module.#inVarley'},
        {type: 'module.benefit'},
        {type: 'module.dualMediaObject'},
        {type: 'module.referAFriend'},
      ],
      group: 'editorial',
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.home',
      group: 'seo',
    },
  ],
  preview: {
    prepare() {
      return {
        // media: icon,
        subtitle: 'Index',
        title: TITLE,
      };
    },
  },
};
