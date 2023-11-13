import type {Block, Image} from '@sanity/types';
import type {
  Collection,
  Customer,
  MailingAddress,
  MailingAddressConnection,
  MediaConnection,
  Order,
  OrderLineItemConnection,
  Product,
  ProductVariantConnection,
} from '@shopify/hydrogen/storefront-api-types';

export type CollectionWithNodes = Partial<Omit<Collection, 'products'>> & {
  products: {
    nodes: ProductWithNodes[];
  };
};

export type CustomerWithNodes = Omit<Customer, 'addresses' | 'orders'> & {
  addresses: {
    nodes: MailingAddressConnection['nodes'];
  };
  orders: {
    nodes: OrderWithNodes[];
  };
};

export type MailingAddressExtended = MailingAddress & {
  originalId: string;
};

export type OrderWithNodes = Omit<Order, 'lineItems'> & {
  lineItems: {
    nodes: OrderLineItemConnection['nodes'];
  };
};

export type ProductWithNodes = Partial<Omit<Product, 'media' | 'variants'>> & {
  media?: {
    nodes: MediaConnection['nodes'];
  };
  variants: {
    nodes: ProductVariantConnection['nodes'];
  };
};

export interface SanityAssetImage extends Image {
  _type: 'image';
  altText?: string;
  blurDataURL: string;
  height: number;
  url: string;
  width: number;
}

export type SanityAssetResponsiveImage = {
  _type: 'mobile.responsiveImage';
  desktopImage: SanityAssetImage;
  mobileImage: SanityAssetImage;
}

export type SanityCollection = {
  _id: string;
  colorTheme: SanityColorTheme;
  gid: string;
  hero?: SanityHeroPage;
  slug?: string;
  title: string;
  vector?: string;
};

export type SanityCollectionPage = {
  _id: string;
  heroCarousel: any;
  colorTheme: SanityColorTheme;
  hero?: SanityHeroCollection;
  modules: (SanityModuleImage | SanityModuleInstagram)[];
  seo: SanitySeo;
  slug?: string;
  sortOrder: string;
  title: string;
};

export type SanityCollectionGroup = {
  _key: string;
  _type: 'navigation.section';
  collectionLinks?: SanityCollection[];
  collectionProducts?: SanityCollection;
  title: string;
  reference?: any;
  altTitle?: string;
};

export type SanityColorTheme = {
  background: string;
  text: string;
};

export type SanityShoppingNote = {
  _key: string;
  _type: 'shoppingNote';
  title: string;
  content: string;
};

export type SanityCustomColorCategory = {
  _key: string;
  _type: 'colorCategory';
  categoryContent: string;
  categoryName: string;
}

export type SanitySettings = {
  data: {
    customProductOptions: SanityCustomProductOption[];
    shoppingNotes: SanityShoppingNote[];
    customColorCategories: SanityCustomColorCategory[];
  }
}

export type SanityCustomProductOption =
  | SanityCustomProductOptionColor
  | SanityCustomProductOptionSize;

interface SanityCustomProductOptionBase {
  _key: string;
  title: string;
}
export interface SanityCustomProductOptionColor
  extends SanityCustomProductOptionBase {
  _type: 'customProductOption.color';
  colors: {
    hex: string;
    title: string;
  }[];
}

export interface SanityCustomProductOptionSize
  extends SanityCustomProductOptionBase {
  _type: 'customProductOption.size';
  sizes: {
    height: number;
    title: string;
    width: number;
  }[];
}

export type SanityHero = SanityHeroCollection | SanityHeroHome | SanityHeroPage;

export type SanityHeroCollection = {
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  description?: string;
  title?: string;
};

export type SanityHeroHome = {
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  link?: SanityLink;
  title?: string;
};

export type SanityHeroBlogs = {
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  link?: SanityLink;
  title?: string;
};

export type SanityHeroPage = {
  heroSlides: any;
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  title?: string;
};

export type SanityHomePage = {
  hero?: SanityHeroHome;
  modules: (SanityModuleImage | SanityModuleInstagram)[];
  seo: SanitySeo;
};

export type SanityBlogsPage = {
  hero?: SanityHeroBlogs;
  modules: (SanityModuleImage | SanityModuleInstagram)[];
  seo: SanitySeo;
};

export type SanityImageWithProductHotspots = {
  _key?: string;
  _type: 'imageWithProductHotspots';
  image: SanityAssetImage;
  productHotspots: SanityProductHotspot[];
};

export type SanityLink = SanityLinkExternal | SanityLinkInternal;

export type SanityLinkExternal = {
  _key: string;
  _type: 'linkExternal';
  newWindow?: boolean;
  url: string;
  title: string;
  reference?: any;
  altTitle?: string;
};

export type SanityLinkInternal = {
  _key: string;
  _type: 'linkInternal';
  documentType: string;
  slug?: string;
  title: string;
  reference?: any;
  altTitle?: string;
};

export type SanityDesktopMenu = {
  desktopNavigation: SanityMenuLink[];
  desktopTopNavigation: SanityMenuLink[];
};

export type SanityMenuLink =
  | SanityCollectionGroup
  | SanityLinkExternal
  | SanityLinkInternal;

export type SanityModule =
  | SanityModuleAccordion
  | SanityModuleCallout
  | SanityModuleCallToAction
  | SanityModuleCollection
  | SanityModuleProductsCarousel
  | SanityModuleCollectionCarousel
  | SanityModuleCollectionListingCarousel
  | SanityModuleMediaObject
  | SanityModuleStockists
  | SanityModulePeople
  | SanityModuleBenefit
  | SanityModuleSwitchboard
  | SanityModuleTabs
  | SanityModuleInVarley
  | SanityModuleGrid
  | SanityModuleImage
  | SanityModuleInstagram
  | SanityModuleScrollToSection
  | SanityModulePostImages
  | SanityModuleProduct
  | SanityModuleVariantsOrder;

export type SanityModuleAccordion = {
  _key?: string;
  _type: 'module.accordion';
  groups: {
    _key: string;
    _type: 'group';
    body: Block[];
    title: string;
  }[];
};

export type SanityModuleCallout = {
  _key?: string;
  _type: 'module.callout';
  link: SanityLink;
  text: string;
};

export type SanityModuleCallToAction = {
  _key?: string;
  _type: 'module.callToAction';
  body?: string;
  content?: SanityAssetImage | SanityProductWithVariant;
  layout: 'left' | 'right';
  link: SanityLink;
  title: string;
};

export type SanityModuleCollection = {
  _key?: string;
  _type: 'module.collection';
  collection: SanityCollection;
  showBackground?: boolean;
};

export type SanityModuleProductsCarousel = {
  _key?: string;
  _type: 'module.productsCarousel';
  carouselOptions: SanityCarouselOptions;
  heading: any[];
  products: {
    _key: string;
    _type: 'productwithimage';
    featuredimage: SanityAssetImage;
    hoverimage: SanityAssetImage;
    productVariant: any;
  }
};

export type SanityModuleCollectionCarousel = {
  _key?: string;
  _type: 'module.collectionCarousel';
  collection: SanityCollection;
  carouselOptions: SanityCarouselOptions;
};

export type SanityModuleCollectionListingCarousel = {
  _key?: string;
  _type: 'module.collectionListingCarousel';
  carouselOptions: SanityCarouselOptions;
};

export type SanityModuleMediaObject = {
  _key?: string;
  _type: 'module.mediaObject';
  media: {
    carouselImages: {
      carouselOptions: SanityCarouselOptions;
    };
    modules: {
      _key?: string;
      _type: 'module.image';
      image: SanityAssetImage;
    }[];
  };
};

export type SanityModuleStockists = {
  _key?: string;
  _type: 'module.stockists';
};

export type SanityModulePeople = {
  _key?: string;
  _type: 'module.people';
};

export type SanityModuleBenefit = {
  _key?: string;
  _type: 'module.benefit';
};

export type SanityModuleSwitchboard = {
  _key?: string;
  _type: 'module.switchboard';
};

export type SanityModuleTabs = {
  _key?: string;
  _type: 'module.tabs';
  groups: {
    _key: string;
    _type: 'group';
    body: Block[];
    title: string;
  }[];
};

export type SanityModuleInVarley = {
  _key?: string;
  _type: 'module.#inVarley';
};

export type SanityModuleBlockInVarley = {
  _key?: string;
  _type: 'blockInVarley';
};

export type SanityModuleBlockTabs = {
  _key?: string;
  _type: 'blockTabs';
};

export type SanityCarouselOptions = {
  _key?: string;
  _type: 'module.carouselOptions';
  arrows: boolean;
  autoplay: boolean;
  autplayDelay: boolean;
  breakpoint: string;
};

export type SanityModuleImage =
  | SanityModuleImageCallToAction
  | SanityModuleImageCaption
  | SanityModuleImageProductHotspots
  | SanityModuleImageProductTags;

export type SanityModuleGrid = {
  _key?: string;
  _type: 'module.grid';
  items: {
    _key: string;
    _type: 'items';
    body: Block[];
    image: SanityAssetImage;
    title: string;
  }[];
};

export type SanityModuleImageBase = {
  _key?: string;
  _type: 'module.image';
  image: SanityAssetImage;
};

export interface SanityModuleImageCallToAction extends SanityModuleImageBase {
  _key?: string;
  callToAction?: {
    link: SanityLink;
    title?: string;
  };
  variant: 'callToAction';
}

export interface SanityModuleImageCaption extends SanityModuleImageBase {
  _key?: string;
  caption?: string;
  variant: 'caption';
}
export interface SanityModuleImageProductHotspots
  extends SanityModuleImageBase {
  _key?: string;
  productHotspots?: SanityProductHotspot[];
  variant: 'productHotspots';
}

export interface SanityModuleImageProductTags extends SanityModuleImageBase {
  _key?: string;
  productTags?: SanityProductWithVariant[];
  variant: 'productTags';
}

export type SanityModuleImages = {
  _key?: string;
  _type: 'module.images';
  fullWidth?: boolean;
  modules: SanityModuleImage[];
  verticalAlign?: 'bottom' | 'center' | 'top';
};

export type SanityModuleInstagram = {
  _key?: string;
  _type: 'module.instagram';
  url: string;
};

export type SanityModuleScrollToSection = {
  _key?: string;
  _type: 'module.scrollToSection';
};

export type SanityModulePostImages = {
  _key?: string;
  _type: 'module.postImages';
};

export type SanityModuleProduct = {
  _key?: string;
  _type: 'module.product';
  productWithVariant: SanityProductWithVariant;
};

export type SanityModuleVariantsOrder = {
  _key?: string;
  _type: 'module.variantsOrder';
  variantsOrder: any[];
}

export type SanityModuleProducts = {
  _key?: string;
  _type: 'module.products';
  layout?: 'card' | 'pill';
  modules: SanityModuleProduct[];
};

export type SanityNotFoundPage = {
  body?: string;
  collectionGid?: string;
  colorTheme?: SanityColorTheme;
  title: string;
};

export type SanityPage = {
  body: Block[];
  colorTheme?: SanityColorTheme;
  hero?: SanityHeroPage;
  seo: SanitySeo;
  title: string;
};

export type SanityProductHotspot = {
  _key?: string;
  product: SanityProductWithVariant;
  x: number;
  y: number;
};

export type SanityProductWithVariant = {
  _id: string;
  _key?: string;
  _type: 'productWithVariant';
  available: boolean;
  gid: string;
  slug?: string;
  variantGid: string;
};

export type SanityProductPage = {
  _id: string;
  available: boolean;
  body: Block[];
  colorTheme?: SanityColorTheme;
  customProductOptions?: SanityCustomProductOption[];
  gid: string;
  slug?: string;
  seo: SanitySeo;
};

export type SanitySeo = {
  description?: string;
  image?: SanityAssetImage;
  title: string;
};

export type SanityVideo = {
  _type: 'video';
  videotype?: string;
  videoIdMobile?: string;
  videoIdDesktop?: string;
};

export interface Size {
  width: number | undefined;
  height: number | undefined;
}