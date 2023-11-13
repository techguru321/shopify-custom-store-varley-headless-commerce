// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail';
import annotationLinkExternal from './annotations/linkExternal';
import annotationLinkInternal from './annotations/linkInternal';
import annotationProduct from './annotations/product';

// Document types
import collection from './documents/collection';
import colorTheme from './documents/colorTheme';
import page from './documents/page';
import product from './documents/product';
import productVariant from './documents/productVariant';
import person from './documents/person';
import usp from './documents/usp';
import stockist from './documents/stockist';
import alert from './documents/alert';
import category from './documents/category';
import post from './documents/post';
import social from './documents/social';
import country from './documents/country';
import inVarley from './documents/inVarley';
import benefits from './documents/benefits';

// Singleton document types
import home from './singletons/home';
import blogs from './singletons/blogs';
import settings from './singletons/settings';

// Block content
import body from './blocks/body';

// Object types
import collectionRule from './objects/collectionRule';
import customProductOptionColor from './objects/customProductOption/color';
import customProductOptionSize from './objects/customProductOption/size';
import imageWithProductHotspots from './objects/imageWithProductHotspots';
import linkExternal from './objects/linkExternal';
import linkInternal from './objects/linkInternal';
import linkEmail from './objects/linkEmail';
import linkChat from './objects/linkChat';

import heroCollection from './objects/hero/collection';
import heroHome from './objects/hero/home';
import heroBlogs from './objects/hero/blogs';
import heroPage from './objects/hero/page';

import moduleBodyPortableText from './objects/bodyPortableText';
import moduleBioPortableText from './objects/bioPortableText';
import moduleExcerptPortableText from './objects/excerptPortableText';
import moduleAuthorReference from './objects/authorReference';
import moduleShoppingNote from './objects/shoppingNote';
import moduleAccordion from './objects/module/accordion';
import moduleCallout from './objects/module/callout';
import moduleCallToAction from './objects/module/callToAction';
import moduleCollection from './objects/module/collection';
import moduleCollectionCarousel from './objects/module/collectionCarousel';
import moduleCollectionListingCarousel from './objects/module/collectionListingCarousel';
import moduleProductsCarousel from './objects/module/productsCarousel';
import moduleGrid from './objects/module/grid';
import moduleImage from './objects/module/image';
import moduleImages from './objects/module/images';
import moduleResponsiveImage from './objects/module/responsiveImage';
import moduleVideo from './objects/module/video';
import moduleInstagram from './objects/module/instagram';
import moduleProduct from './objects/module/product';
import moduleProducts from './objects/module/products';
import modulePositioning from './objects/module/positioning';
import modulePush from './objects/module/push';
import moduleBackground from './objects/module/background';
import moduleColours from './objects/module/colours';
import moduleBehaviour from './objects/module/behaviour';
import moduleHeading from './objects/module/heading';
import moduleSimpleBlockContent from './objects/module/simpleBlockContent';
import moduleAlertBlockContent from './objects/module/alertBlockContent';
import moduleUiComponent from './objects/module/uiComponent';
import moduleTabs from './objects/module/tabs';
import moduleUsp from './objects/module/usp';
import moduleBenefit from './objects/module/benefit';
import moduleStockist from './objects/module/stockists';
import moduleSocial from './objects/module/social';
import modulePeople from './objects/module/people';
import modulePersonReference from './objects/module/personReference';
import moduleUspReference from './objects/module/uspReference';
import moduleBenefitsReference from './objects/module/benefitsReference';
import moduleStockistReference from './objects/module/stockistReference';
import moduleAlertsReference from './objects/module/alertsReference';
import moduleSocialReference from './objects/module/socialReference';
import moduleCountryReference from './objects/module/countryReference';
import modulefooterItem from './objects/module/footerItem';
import modulefooterCols from './objects/module/footerCols';
import moduleNavigationSection from './objects/module/navigationSection';
import moduleNavigationLink from './objects/module/navigationLink';
import moduleNavigationImage from './objects/module/navigationImage';
import moduleVariantsReference from './objects/module/variantsRef';
import moduleVariants from './objects/module/variants';
import moduleCarouselOptions from './objects/module/carouselOptions';
import moduleCollectionCard from './objects/module/collectionCard';
import moduleMediaObject from './objects/module/mediaObject';
import moduleCallToActionLimited from './objects/module/callToActionLimited';
import moduleMedia from './objects/module/media';
import moduleStackedMedia from './objects/module/stackedMedia';
import moduleCarouselImages from './objects/module/carouselImages';
import moduleFailsafe from './objects/module/failsafe';
import moduleSwitchboard from './objects/module/switchboard';
import moduleInsta from './objects/module/insta';
import moduleInstaReference from './objects/module/instaReference';
import moduleInVarley from './objects/module/#inVarley';
import moduleSpot from './objects/module/spot';
import moduleCta from './objects/module/cta';
import moduleSpotContent from './objects/module/spotContent';
import modulePostImages from './objects/module/postImages';
import moduleSimpleImage from './objects/module/simpleImage';
import moduleShopTheLook from './objects/module/shopTheLook';
import moduleScrollNavItem from './objects/module/scrollNavItem';
import moduleScrollToSection from './objects/module/scrollToSection';
import moduleDualMediaObject from './objects/module/dualMediaObject';
import moduleMediaObjectGroup from './objects/module/mediaObjectGroup';
import moduleStackedMediaObject from './objects/module/stackedMediaObject';
import moduleHeroSlide from './objects/module/heroSlide';
import moduleSizing from './objects/module/sizing';
import moduleSizeTable from './objects/module/sizetable';
import moduleSizeInfo from './objects/module/sizeInfo';
import moduleLayout from './objects/module/layout';
import moduleSimpleCopy from './objects/module/simpleCopy';
import moduleReferAFriend from './objects/module/referAFriend';

import placeholderString from './objects/placeholderString';
import productHotspots from './objects/productHotspots';
import productOption from './objects/productOption';
import productWithVariant from './objects/productWithVariant';
import proxyString from './objects/proxyString';
import seoHome from './objects/seo/home';
import seoBlogs from './objects/seo/blogs';
import seoPage from './objects/seo/page';
import seoShopify from './objects/seo/shopify';
import shopifyCollection from './objects/shopifyCollection';
import shopifyProduct from './objects/shopifyProduct';
import shopifyProductVariant from './objects/shopifyProductVariant';
import moduleSettings from './objects/settings';

// Build the schemas and export to the Sanity Studio app
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // Annotations
    annotationLinkEmail,
    annotationLinkExternal,
    annotationLinkInternal,
    annotationProduct,
    // Document types
    collection,
    page,
    product,
    productVariant,
    person,
    usp,
    stockist,
    alert,
    category,
    post,
    social,
    country,
    inVarley,
    benefits,
    // Singleton document types
    home,
    blogs,
    settings,
    // Block content
    body,
    // Objects
    collectionRule,
    colorTheme,
    customProductOptionColor,
    customProductOptionSize,
    heroCollection,
    heroHome,
    heroBlogs,
    heroPage,
    imageWithProductHotspots,
    linkExternal,
    linkInternal,
    linkEmail,
    linkChat,
    moduleBodyPortableText,
    moduleBioPortableText,
    moduleExcerptPortableText,
    moduleAuthorReference,
    moduleShoppingNote,
    moduleAccordion,
    moduleCallout,
    moduleCallToAction,
    moduleCollection,
    moduleGrid,
    moduleImage,
    moduleSpot,
    moduleImages,
    moduleResponsiveImage,
    moduleInstagram,
    moduleBenefit,
    moduleProduct,
    moduleProducts,
    moduleVideo,
    modulePositioning,
    modulePush,
    moduleBackground,
    moduleColours,
    moduleBehaviour,
    moduleHeading,
    moduleSimpleBlockContent,
    moduleAlertBlockContent,
    moduleUiComponent,
    moduleSpotContent,
    moduleTabs,
    moduleCta,
    modulePeople,
    modulePersonReference,
    moduleUsp,
    moduleStockist,
    moduleUspReference,
    moduleStockistReference,
    moduleAlertsReference,
    moduleSocialReference,
    moduleCountryReference,
    moduleCollectionCarousel,
    moduleCollectionListingCarousel,
    moduleProductsCarousel,
    moduleBenefitsReference,
    moduleCallToActionLimited,
    moduleCollectionCard,
    moduleSocial,
    modulefooterItem,
    modulefooterCols,
    moduleNavigationSection,
    moduleNavigationLink,
    moduleNavigationImage,
    moduleVariantsReference,
    moduleCarouselOptions,
    moduleMediaObject,
    moduleCarouselImages,
    moduleMedia,
    moduleStackedMedia,
    moduleVariants,
    moduleFailsafe,
    moduleSwitchboard,
    moduleInsta,
    moduleInstaReference,
    moduleInVarley,
    moduleSimpleCopy,
    modulePostImages,
    moduleSimpleImage,
    moduleShopTheLook,
    moduleScrollNavItem,
    moduleScrollToSection,
    moduleDualMediaObject,
    moduleReferAFriend,
    moduleMediaObjectGroup,
    moduleStackedMediaObject,
    moduleHeroSlide,
    moduleSizing,
    moduleSizeTable,
    moduleSizeInfo,
    moduleLayout,
    placeholderString,
    productHotspots,
    productOption,
    productWithVariant,
    proxyString,
    seoHome,
    seoBlogs,
    seoPage,
    seoShopify,
    shopifyCollection,
    shopifyProduct,
    shopifyProductVariant,
    moduleSettings,
  ]),
});
