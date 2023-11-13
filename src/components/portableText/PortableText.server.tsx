import BlockContent from '@sanity/block-content-to-react';
import type {Block as SanityBlock} from '@sanity/types';
import clsx from 'clsx';
import type {SanityColorTheme} from '../../types';
import LinkEmailAnnotation from './annotations/LinkEmail';
import LinkExternalAnnotation from './annotations/LinkExternal';
import LinkInternalAnnotation from './annotations/LinkInternal';
import ItalicAnnotation from './annotations/Italic';
import UnderlineAnnotation from './annotations/Underline';
import ProductAnnotation from './annotations/Product.server';
import AccordionBlock from './blocks/Accordion.client';
import Block from './blocks/Block';
import CalloutBlock from './blocks/Callout.server';
import GridBlock from './blocks/Grid.server';
import ImagesBlock from './blocks/Images.server';
import InstagramBlock from './blocks/Instagram.server';
import PeopleBlock from './blocks/People.client';
import StockistsBlock from './blocks/Stockists.server';
import FailsafeBlock from './blocks/Failsafe.server';
import SwitchboardBlock from './blocks/Switchboard.client';
import InVarleyBlock from './blocks/InVarley.server';
import DualMediaObjectBlock from './blocks/DualMediaObject.server';
import StackedMediaObjectBlock from './blocks/StackedMediaObject.server';
// A go between to render server components in client components see: https://shopify.dev/custom-storefronts/hydrogen/react-server-components
import TabsBlock from './blocks/Tabs.client';
import ReferAFriendBlock from './blocks/ReferAFriend.client';
import ListBlock from './blocks/List';
import ProductsBlock from './blocks/Products.server';
import ShopTheLookBlock from './blocks/ShopTheLook.server';
import ScrollToSectionBlock from './blocks/ScrollToSection.client';
import TextCentreAnnotation from './annotations/TextCentre';

type Props = {
  blocks: SanityBlock[];
  className?: string;
  centered?: boolean;
  colorTheme?: SanityColorTheme;
};

export default function PortableText({
  blocks,
  centered,
  className,
  colorTheme,
}: Props) {
  return (
    <BlockContent
      blocks={blocks}
      className={clsx('portableText', className)}
      renderContainerOnSingleChild
      serializers={{
        // Lists
        list: ListBlock,
        // Marks
        marks: {
          annotationLinkEmail: LinkEmailAnnotation,
          annotationLinkExternal: LinkExternalAnnotation,
          annotationLinkInternal: LinkInternalAnnotation,
          brandItalic: ItalicAnnotation,
          brandUnderline: UnderlineAnnotation,
          brandTextCentre: TextCentreAnnotation,
          color: (props: any) => {
            return (
              <span style={{color: props?.mark?.hex}}>{props.children}</span>
            );
          },
          annotationProduct: (props: any) => (
            <ProductAnnotation colorTheme={colorTheme} {...props} />
          ),
        },
        // Block types
        types: {
          block: (props: any) => <Block className={className} {...props} />,
          blockAccordion: AccordionBlock,
          blockCallout: (props: any) => (
            <CalloutBlock
              centered={centered}
              colorTheme={colorTheme}
              {...props}
            />
          ),
          blockGrid: GridBlock,
          blockImages: (props: any) => (
            <ImagesBlock centered={centered} {...props} />
          ),
          blockInstagram: InstagramBlock,
          blockProducts: ProductsBlock,
          blockPeople: PeopleBlock,
          blockStockists: StockistsBlock,
          blockFailsafe: FailsafeBlock,
          blockSwitchboard: SwitchboardBlock,
          blockInVarley: InVarleyBlock,
          blockTabs: TabsBlock,
          blockShopTheLook: ShopTheLookBlock,
          blockDualMediaObject: DualMediaObjectBlock,
          blockReferAFriend: ReferAFriendBlock,
          blockStackedMediaObject: StackedMediaObjectBlock,
          blockScrollToSection: ScrollToSectionBlock,
        },
      }}
    />
  );
}
