import type {SanityColorTheme, SanityModule} from '../../types';
import CalloutModule from './Callout.server';
import CallToActionModule from './CallToAction.server';
import CollectionModule from './Collection.server';
import CollectionCarouselModule from './CollectionCarousel.server';
import CollectionListingCarouselModule from './CollectionListingCarousel.server';
import ImageModule from './Image.server';
import InstagramModule from './Instagram.client';
import ProductModule from './Product.server';
import MediaObject from './MediaObject.server';
import Stockists from './Stockists.server';
import People from './People.client';
import Switchboard from './Switchboard.server';
import AccordionModule from './Accordion.client';
import InVarley from './InVarley.server';
import TabsModule from './Tabs.client';
import BenefitModule from './Benefit.server';
import PostImages from './PostImages.server';
import ProductsCarouselModule from './ProductsCarousel.server';
// import ScrollToSectionModule from '../portableText/blocks/ScrollToSection.client';

type Props = {
  colorTheme?: SanityColorTheme;
  imageAspectClassName?: string;
  module: SanityModule;
};

export default function Module({
  colorTheme,
  imageAspectClassName,
  module,
}: Props) {
  switch (module._type) {
    case 'module.accordion':
      return <AccordionModule module={module} />;
    case 'module.callout':
      return <CalloutModule colorTheme={colorTheme} module={module} />;
    case 'module.callToAction':
      return <CallToActionModule module={module} />;
    case 'module.collection':
      return <CollectionModule module={module} />;
    case 'module.productsCarousel':
      return <ProductsCarouselModule module={module} />;
    case 'module.collectionCarousel':
      return <CollectionCarouselModule module={module} />;
    case 'module.collectionListingCarousel':
      return <CollectionListingCarouselModule module={module} />;
    case 'module.mediaObject':
      return <MediaObject module={module} />;
    case 'module.stockists':
      return <Stockists module={module} />;
    case 'module.people':
      return <People module={module} />;
    case 'module.switchboard':
      return <Switchboard module={module} />;
    case 'module.image':
      return <ImageModule module={module} />;
    case 'module.postImages':
      return <PostImages module={module} />;
    case 'module.#inVarley':
      return <InVarley module={module} />;
    case 'module.instagram':
      return <InstagramModule module={module} />;
    // case 'module.scrollToSection':
    //   return <ScrollToSectionModule module={module} />;
    case 'module.tabs':
      return <TabsModule module={module} />;
    case 'module.benefit':
      return <BenefitModule module={module} />;
    case 'module.product':
      return (
        <ProductModule
          imageAspectClassName={imageAspectClassName}
          module={module}
        />
      );
    default:
      return null;
  }
}
